/**
 * This is heavily inspired by https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/
 */

// required packages
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Prism = require("prismjs");
const he = require("he");

const highlightCode = (content) => {
    const dom = new JSDOM(content);

    let preElements = dom.window.document.querySelectorAll("pre");

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

                // set grammar that prism should use for highlighting
                let prismGrammar = Prism.languages.html;

                if (codeLanguage === "javascript" || codeLanguage === "js") {
                    prismGrammar = Prism.languages.javascript;
                }

                if (codeLanguage === "css") {
                    prismGrammar = Prism.languages.css;
                }

                // highlight code
                code.innerHTML = Prism.highlight(
                    code.innerHTML,
                    prismGrammar,
                    codeLanguage,
                );

                code.innerHTML = he.decode(code.innerHTML);
                code.classList.add(`language-${codeLanguage}`);
            }
        });

        content = dom.window.document.body.innerHTML;
    }

    return content;
};

// get blogposts
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllArticles() {
    // max number of records to fetch per query
    const recordsPerQuery = 100;

    // number of records to skip (start at 0)
    let offset = 0;

    // do we make a query ?
    let makeNewQuery = true;

    // Blogposts array
    let blogposts = [];

    // make queries until makeNewQuery is set to false
    while (makeNewQuery) {
        try {
            // initiate fetch
            const response = await fetch(
                `https://www.dertagundich.de/wp-json/wp/v2/msme_posts?per_page=${recordsPerQuery}&offset=${offset}`,
            );

            // store the JSON response when promise resolves
            const posts = await response.json();

            // update blogpost array with the data from the JSON response
            blogposts = blogposts.concat(posts);

            // prepare for next query
            offset += recordsPerQuery;

            // check if we are geting back less than the records we fetch per query
            // if yes, stop querying
            if (response.headers.get("X-WP-Total") <= offset) {
                makeNewQuery = false;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    const filteredPosts = blogposts.map((post) => {
        const dateConverterOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        // Remove HTML-Tags from Meta-Description
        let metaDescription = post.excerpt.rendered.replace(
            /(<([^>]+)>)/gi,
            "",
        );
        metaDescription = metaDescription.replace("\n", "");

        // Code-Highlighting with Prism
        let content = highlightCode(post.content.rendered);

        // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
        content = content.replace(
            'href="/',
            'href="https://martinschneider.me/',
        );

        return {
            title: post.title.rendered,
            date: post.date,
            formattedDate: new Date(post.date).toLocaleDateString(
                "en-US",
                dateConverterOptions,
            ),
            rssDate: new Date(post.date).toUTCString(),
            modifiedDate: post.modified,
            slug: post.slug,
            metaDescription: metaDescription,
            excerpt: post.excerpt.rendered,
            content: content,
        };
    });

    return filteredPosts;
}

module.exports = getAllArticles;
