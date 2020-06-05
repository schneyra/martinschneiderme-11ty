const fetch = require("node-fetch");
const highlightCode = require("../../functions/helper/highlightCode");

// get blogposts
// This is heavily inspired by https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/
async function getAllArticles() {
    const recordsPerQuery = 100;

    let offset = 0;
    let queryPosts = true;
    let blogposts = [];

    while (queryPosts) {
        try {
            const response = await fetch(
                `https://www.dertagundich.de/wp-json/wp/v2/msme_posts?per_page=${recordsPerQuery}&offset=${offset}`,
            );

            const posts = await response.json();

            blogposts = blogposts.concat(posts);
            offset += recordsPerQuery;

            if (response.headers.get("X-WP-Total") <= offset) {
                queryPosts = false;
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
