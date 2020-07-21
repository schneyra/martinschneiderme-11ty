const fetch = require("node-fetch");

async function getWebmentionCount(slug) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://webmention.io/api/count.json?target=https://martinschneider.me/articles/${slug}/`,
        )
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}

function generateWebmentionHtml(count) {
    const label = count.count === 1 ? "Reaction" : "Reactions";

    let html = `<h3 class="glitch" data-glitch="${count.count} ${label}">${count.count} ${label}</h3>`;

    return html;
}

module.exports = async (slug, callback) => {
    const count = await getWebmentionCount(slug);
    const html = generateWebmentionHtml(count);
    callback(null, html);
};
