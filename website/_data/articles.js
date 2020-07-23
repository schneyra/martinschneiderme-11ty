const AssetCache = require("@11ty/eleventy-cache-assets");
const filterPosts = require("../../functions/helper/filterPosts");

// http://host.docker.internal/wp-json/wp/v2/msme_posts
async function fetchArticles() {
    try {
        return AssetCache(
            "https://www.dertagundich.de/wp-json/wp/v2/msme_posts",
            {
                duration: "1d",
                type: "json",
            },
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

module.exports = async () => {
    const blogposts = await fetchArticles();
    return filterPosts(blogposts);
};
