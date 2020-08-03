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
    const cacheFile = flatCache.load("cachedPosts", path.resolve(".cache"));
    const cachedPosts = cacheFile.getKey("cachedPosts");

    if (cachedPosts) {
        console.log("Articles: Returning cached posts");
        return cachedPosts;
    } else {
        const filteredPostsData = await filterPosts(blogposts);
        cacheFile.setKey("cachedPosts", filteredPostsData);
        cacheFile.save();

        console.log("Articles: Saved posts to cache");

        return filteredPostsData;
    }
};
