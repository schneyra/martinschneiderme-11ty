const helper = require("./helper");

async function webmentionsForUrl() {
    let url = `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=100000&token=${helper.webmention_io_token}`;

    const response = await fetch(url);
    const mentions = await response.json();

    return mentions;
}

module.exports = async () => {
    return await webmentionsForUrl();
};
