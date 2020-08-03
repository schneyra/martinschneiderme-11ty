const AssetCache = require("@11ty/eleventy-cache-assets");
const flatCache = require("flat-cache");
const path = require("path");

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
    var cachedPosts = flatCache.load("modifiedPosts", path.resolve(".cache"));

    if (cachedPosts.getKey("posts")) {
        console.log("Articles: Returning cached posts");
        return cachedPosts.getKey("posts");
    } else {
        const filteredPostsData = await filterPosts(blogposts);
        cachedPosts.setKey("posts", filteredPostsData);
        cachedPosts.save();

        console.log("Articles: Saved posts to cache");

        return filteredPostsData;
    }
};
