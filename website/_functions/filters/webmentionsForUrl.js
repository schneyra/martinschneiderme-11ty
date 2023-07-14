module.exports = function getWebmentionsForUrl(webmentions, url) {
    if (webmentions && webmentions.children) {
        return webmentions.children.filter(
            (entry) => entry["wm-target"] === url
        );
    }

    return [];
};
