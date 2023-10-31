const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const longDate = require("./website/_functions/filters/longDate.js");
const niceUrl = require("./website/_functions/filters/niceUrl.js");
const shuffle = require("./website/_functions/filters/shuffle.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const pictureElementShortcode = require("./website/_functions/filters/pictureElementShortcode");
const figureShortcodeForArticles = require("./website/_functions/filters/figureShortcodeForArticles");
const createOgImage = require("./website/_functions/filters/createOgImage");
const stripTags = require("./website/_functions/filters/stripTags");
const webmentionsForUrl = require("./website/_functions/filters/webmentionsForUrl");
const averageColor = require("./website/_functions/filters/averageColor");

const htmlmin = require("./website/_functions/transforms/htmlmin");
const purgecss = require("./website/_functions/transforms/purgecss");

const postCSS = require("./website/_functions/before/postCSS");

const util = require("util");

module.exports = function (eleventyConfig) {
    // PLUGINS
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(directoryOutputPlugin);

    eleventyConfig.setQuietMode(true);

    eleventyConfig.addPassthroughCopy({
        "./website/favicon.ico": "favicon.ico",
        "./website/images/": "images",
        "./website/fonts/": "fonts",
        "./website/dist/": "dist",
        "./node_modules/instant.page/instantpage.js": "instantpage.js",
        "./node_modules/msme-sharing-button/msme-sharing-button.js":
            "msme-sharing-button.js"
    });

    // FILTERS
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("longDate", longDate);
    eleventyConfig.addFilter("niceUrl", niceUrl);
    eleventyConfig.addFilter("shuffle", shuffle);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addFilter("stripTags", stripTags);
    eleventyConfig.addFilter("webmentionsForUrl", webmentionsForUrl);
    eleventyConfig.addNunjucksAsyncFilter("createOgImage", createOgImage);

    eleventyConfig.addFilter("console", function (value) {
        const str = util.inspect(value);
        return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`;
    });

    eleventyConfig.addNunjucksAsyncShortcode(
        "pictureElement",
        pictureElementShortcode
    );

    eleventyConfig.addNunjucksAsyncShortcode(
        "figureElement",
        figureShortcodeForArticles
    );

    eleventyConfig.addAsyncFilter("getAverageColor", averageColor);

    // ASSETS
    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.watchIgnores.add("./website/dist/**/*");

    eleventyConfig.on("eleventy.before", postCSS);

    // TRANSFORMS
    eleventyConfig.addTransform("htmlmin", htmlmin);
    eleventyConfig.addTransform("purgecss", purgecss);

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
