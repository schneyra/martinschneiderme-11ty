const EleventyFetch = require("@11ty/eleventy-fetch");
const helper = require("./helper");

async function webmentionsForUrl() {
    try {
        let url = `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=100000&token=${helper.webmention_io_token}`;

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
    return await webmentionsForUrl();
};
