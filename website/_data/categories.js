const AssetCache = require("@11ty/eleventy-cache-assets");

module.exports = async () => {
    try {
        return AssetCache(
            "https://www.dertagundich.de/wp-json/wp/v2/msme_categories",
            // http://host.docker.internal/wp-json/wp/v2/msme_categories,
            {
                duration: "1d",
                type: "json",
            },
        );
    } catch (error) {
        console.log(error);
        return [];
    }
};
