const EleventyFetch = require("@11ty/eleventy-fetch");

async function fetchPosts() {
    try {
        let url = `https://www.dertagundich.de/latestposts`;

        return EleventyFetch(url, {
            duration: "10m",
            type: "json"
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

module.exports = async () => {
    let posts = await fetchPosts();
    return posts;
};
