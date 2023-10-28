module.exports = function niceUrl(url) {
    url = url.replace("https://", "");
    url = url.replace("www.", "");

    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }

    return url;
};
