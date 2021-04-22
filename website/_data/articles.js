const AssetCache = require("@11ty/eleventy-cache-assets");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Prism = require("prismjs");
const createOgImage = require("./../_functions/helper/createOgImage");
const imageShortcode = require("./../_functions/filters/imageShortcode");

/**
 * Get the articles from WordPress
 * Uses eleventy-cache-assets to speed up build time
 */
async function fetchArticles() {
    try {
        return AssetCache(
            //"http://host.docker.internal/wp-json/wp/v2/msme_posts?per_page=100",
            "https://www.dertagundich.de/wp-json/wp/v2/msme_posts?per_page=100",
            {
                duration: "1m",
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

/**
 * Clean up and convert the API response for our needs
 */
async function processPosts(blogposts) {
    return Promise.all(
        blogposts.map(async (post) => {
            // remove HTML-Tags from the excerpt for meta description
            let metaDescription = post.excerpt.rendered.replace(
                /(<([^>]+)>)/gi,
                ""
            );
            metaDescription = metaDescription.replace("\n", "");

            let content = post.content.rendered;

            content = await highlightCode(content);
            content = await generateImages(content);

            if (content === undefined) {
                console.log('🧨 ' + post.title.rendered);
            }

            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://martinschneider.me/'
            );

            const ogImage = await createOgImage(post.title.rendered);

            // Return only the data that is needed for the actual output
            return await {
                title: post.title.rendered,
                date: post.date,
                formattedDate: new Date(post.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }),
                rssDate: new Date(post.date).toUTCString(),
                modifiedDate: post.modified,
                slug: post.slug,
                metaDescription: metaDescription,
                excerpt: post.excerpt.rendered,
                content: content,
                categorySlugs: post.msme_categories_slugs,
                ogImage: ogImage
            };
        })
    );
}

/**
 * Use Prism.js to highlight embedded code
 */
async function highlightCode(content) {
    return new Promise((resolve) => {
        // since Prism.js works on the DOM,
        // we need an instance of JSDOM in the build
        const dom = new JSDOM(content);

        let preElements = dom.window.document.querySelectorAll("pre");

        // WordPress delivers a `code`-tag that is wrapped in a `pre`
        // the used language is specified by a CSS class
        if (preElements.length) {
            preElements.forEach((pre) => {
                let code = pre.querySelector("code");

                if (code) {
                    // get specified language from css-classname
                    let codeLanguage = "html";
                    const preClass = pre.className;

                    var matches = preClass.match(/language-(.*)/);
                    if (matches != null) {
                        codeLanguage = matches[1];
                    }

                    // save the language for later use in CSS
                    pre.dataset.language = codeLanguage;

                    // set grammar that prism should use for highlighting
                    let prismGrammar = Prism.languages.html;

                    if (
                        codeLanguage === "javascript" ||
                        codeLanguage === "js" ||
                        codeLanguage === "json"
                    ) {
                        prismGrammar = Prism.languages.javascript;
                    }

                    if (codeLanguage === "css") {
                        prismGrammar = Prism.languages.css;
                    }

                    // highlight code
                    code.innerHTML = Prism.highlight(
                        code.textContent,
                        prismGrammar,
                        codeLanguage
                    );

                    code.classList.add(`language-${codeLanguage}`);
                }
            });

            content = dom.window.document.body.innerHTML;
        }

        resolve(content);
    });
}

/**
 * Use 11ty/Image to generate a picture tag from the embedded images
 */
async function generateImages(content) {
    const dom = new JSDOM(content);

    let images = dom.window.document.querySelectorAll("img");

    await Promise.all(
        [...images].map(async (image) => {
            if (image.src) {
                const picture = await imageShortcode(
                    image.src,
                    //"http://host.docker.internal/wp-content/uploads/2021/01/dtui-fallback.jpg",
                    image.alt,
                    [440, 880, 1200, 1680, 2400],
                    "(min-width: 52rem) 52rem, 100vw"
                );

                image.outerHTML = picture;

                return image;
            }
        })
    );

    content = dom.window.document.body.innerHTML;
    return content;
}

module.exports = async () => {
    const blogposts = await fetchArticles();
    const processedPosts = await processPosts(blogposts);
    return processedPosts;
};
