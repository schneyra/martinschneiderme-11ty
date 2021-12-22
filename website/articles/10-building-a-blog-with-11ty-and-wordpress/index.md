---
title: "Building a Blog With 11ty and WordPress"
layout: article
date: 2020-08-04
excerpt: "When I decided to move to the Jamstack, I was sure that I wanted to build something with an API and since I'm quite familiar with WordPress and its API that was an easy choice. But what seemed to be an easy task has had its obstacles."
---

The initial idea was that working with different APIs would force me to get more comfortable again with `fetch` and the work with promises. But relying on an API was also a good idea since my choice of technology only lasted some weeks. <a href="/articles/goodbye-sapper-hello-eleventy/">The switch from Sapper to Eleventy</a> would have been much more work without the blogposts stored in my good old WordPress.

## Getting and Processing the Article Data

The <a href="/articles/">articles on this site</a> are stored as a <a href="https://wordpress.org/support/article/post-types/#custom-post-types">Custom Post Type</a> in the same WordPress that also runs my german blog <a href="https://www.dertagundich.de">der tag und ich</a>. WordPress has an <a href="https://developer.wordpress.org/rest-api/">integrated REST API</a> that can be accessed from anywhere by a POST request. I'm calling the API from within a JavaScript file in <a href="https://www.11ty.dev/docs/data-js/">Eleventy's <em>\_data</em> folder</a>. After fetching the articles, they are added to a data object that is available in every template. This is a very powerful feature of Eleventy and you should really read the linked docs and see more examples of it's use cases.

But before the articles are available for generating the actual markup of the pages I'm doing some more things. First, I'm picking the parts of the API response that are really necessary for my templates. WordPress delivers lots of information that I don't need. The picked parts are then partially modified for my needs, which includes the formatting of the dates for example.

The other big step is the highlighting of the code snippets in my articles. Sadly, I wasn't able to use the official <a href="https://github.com/11ty/eleventy-plugin-syntaxhighlight">eleventy-plugin-syntaxhighlight</a> because I'm getting the content of my articles as a complete chunk of HTML. There are ways to modify the output of the API but I'm more or less fine with it at the moment. So I'm using <a href="https://prismjs.com/">Prism.js</a> after loading the content of an article into an instance of <a href="https://github.com/jsdom/jsdom">jsdom</a>. You'll see that in a minute.

To speed things a bit up: Here's the code of <em>\_data/articles.js</em> that I'm using right now to get the articles from WordPress and preprocess them for Eleventy. I hope my comments are good enough so you understand what I'm doing there in detail. If not — or if you have a suggestion to make something better — please contact me!

```js
const AssetCache = require("@11ty/eleventy-cache-assets");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Prism = require("prismjs");

/**
 * Get the articles from WordPress
 * Uses eleventy-cache-assets to speed up build time
 */
async function fetchArticles() {
    try {
        return AssetCache(
            // http://host.docker.internal/wp-json/wp/v2/msme_posts?per_page=100
            "https://www.dertagundich.de/wp-json/wp/v2/msme_posts?per_page=100",
            {
                duration: "1d",
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

            // Code highlighting with Prism
            let content = highlightCode(post.content.rendered);

            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://martinschneider.me/'
            );

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
                categorySlugs: post.msme_categories_slugs
            };
        })
    );
}

/**
 * Use Prism.js to highlight embedded code
 */
function highlightCode(content) {
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

    return content;
}

module.exports = async () => {
    const blogposts = await fetchArticles();
    const processedPosts = await processPosts(blogposts);
    return processedPosts;
};
```

As you might have noticed, I'm fetching a maximum of one hundred posts. That's the upper limit of the API and that's OK for me now. I have to write ninety more posts until I'm running into a problem and I've dropped the possibility to load more posts in favour of using <a href="https://github.com/11ty/eleventy-cache-assets">eleventy-cache-assets</a>. Unfortunately, the plugin does not provide the response headers where WordPress returns the total number of posts and pages which would be needed for a loop. Before using the cache plugin I had an implementation that was pretty close to <a href="https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/">this solution</a> that Jérôme Coupé build for a GraphQL API. On this page, I'll deal with that problem once I'll be close to one hundred posts. You should definitely subscribe to my <a href="/articles/feed.xml">RSS feed</a> to stay updated!

## Writing the Pages With Eleventy

Building the overview page for the articles was not much more than following the instructions in the <a href="https://www.11ty.dev/docs/pagination/">11ty documentation on paginations</a>. You might find the sections "Paging a Collection" and "Remapping with permalinks" useful. Here's the front matter of the overview template, where `pagination` and `permalink` are the interesting parts. The actual markup of the list is just an `ul` filled with `article` elements.

```yaml
---
layout: page
title: Articles
pagination:
    data: articles
    size: 10
permalink: articles{% if pagination.pageNumber > 0 %}/page{{ pagination.pageNumber + 1}}{% endif %}/index.html
---
```

The exact same technique is used to display the actual article in its template. See how I've set the size of the pagination to "1" and aliased the pagination for some naming convenience in the markup.

```yaml
---
layout: page
pagination:
    data: articles
    size: 1
    alias: article
permalink: articles/{{ article.slug }}/index.html
---
```

If you have read other articles on building a blog with 11ty, you might notice that I did not include any front matter for meta descriptions or the `title` tag in this template. I'm doing that on other pages as well. Unfortunately, front matter cannot be filled from Nunjucks variables. So I had to trick a bit in my base template. The following code sits right after the front matter in my base layout and solves that problem.

{% raw %}

```twig
{# Override front matter if the current page is an article #}
{% if article.title %}
    {% set title = article.title %}
{% endif %}

{% if article.metaDescription %}
    {% set metaDescription = article.metaDescription %}
{% endif %}

{% if article.slug %}
    {% set metaSlug = '/articles/' + article.slug+ '/' %}
{% endif %}
```

{% endraw %}

## Triggering New Netlify Builds From WordPress

That's how the pages of the "article" part of this site are generated. Within my WordPress I'm currently using the plugin <a href="https://wordpress.org/plugins/deploy-netlifypress/">Deploy with NetlifyPress</a> to trigger a new build of my page when I change one of the posts in my custom post type. There are several other plugins out there, but I like that I can specify which Custom Post Type should trigger a build. And that's it. If you have any questions or ideas: <a href="https://twitter.com/schneyra">Feel free to contact me</a>.
