const fetch = require("node-fetch");

async function getWebmentions(slug) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&sort-dir=up&target=https://martinschneider.me/articles/${slug}/`,
        )
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}

function generateWebmentionHtml(mentions, slug) {
    let html = `
    <button class="icon-button icon-button--has-text" data-webmentionbutton="${slug}">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-button__icon" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="screen-reader-text">Show</span>
        <span class="icon-button__text">${mentions.children.length} Reactions</span>
    </button>`;

    return html;
}

module.exports = async (slug, callback) => {
    const webmentions = await getWebmentions(slug);
    const html = generateWebmentionHtml(webmentions, slug);
    callback(null, html);
};
