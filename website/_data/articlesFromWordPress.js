/**
 * This is heavily inspired by https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/
 */

// required packages
const fetch = require("node-fetch");

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
        // Remove HTML-Tags from Meta-Description
        let metaDescription = post.excerpt.rendered.replace(
            /(<([^>]+)>)/gi,
            "",
        );
        metaDescription = metaDescription.replace("\n", "");

        return {
            title: post.title.rendered,
            date: post.date,
            slug: post.slug,
            metaDescription: metaDescription,
            excerpt: post.excerpt.rendered,
            content: post.content.rendered,
        };
    });

    return filteredPosts;
}

module.exports = getAllArticles;
