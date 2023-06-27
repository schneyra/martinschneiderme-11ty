const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const longDate = require("./website/_functions/filters/longDate.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const htmlmin = require("./website/_functions/transforms/htmlmin");
const pictureElementShortcode = require("./website/_functions/filters/pictureElementShortcode");
const figureShortcodeForArticles = require("./website/_functions/filters/figureShortcodeForArticles");
const createOgImage = require("./website/_functions/filters/createOgImage");
const stripTags = require("./website/_functions/filters/stripTags");

module.exports = function (eleventyConfig) {
    // PLUGINS
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(directoryOutputPlugin);

    eleventyConfig.setQuietMode(true);

    eleventyConfig.addPassthroughCopy({
        "./node_modules/instant.page/instantpage.js": "instantpage.js",
        "./node_modules/msme-sharing-button/msme-sharing-button.js":
            "msme-sharing-button.js"
    });

    // FILTERS
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("longDate", longDate);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addFilter("stripTags", stripTags);
    eleventyConfig.addNunjucksAsyncFilter("createOgImage", createOgImage);

    eleventyConfig.addNunjucksAsyncShortcode(
        "pictureElement",
        pictureElementShortcode
    );

    eleventyConfig.addNunjucksAsyncShortcode(
        "figureElement",
        figureShortcodeForArticles
    );

    eleventyConfig.on('eleventy.before', function (config) {
        console.log('before')
    });
    
    // TRANSFORMS
    eleventyConfig.addTransform("htmlmin", htmlmin);

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
