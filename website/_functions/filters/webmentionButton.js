const AssetCache = require("@11ty/eleventy-cache-assets");

async function getWebmentionCount(slug) {
    try {
        return AssetCache(
            `https://webmention.io/api/count.json?target=https://martinschneider.me${slug}`,
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

function generateWebmentionHtml(count) {
    const label = count.count === 1 ? "Reaction" : "Reactions";

    let html = `${count.count} ${label}`;

    return html;
}

module.exports = async (slug, callback) => {
    const count = await getWebmentionCount(slug);
    const html = generateWebmentionHtml(count);
    callback(null, html);
};
