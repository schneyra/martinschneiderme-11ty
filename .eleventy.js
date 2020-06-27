const w3DateFilter = require("./functions/filters/w3cDate.js");
const recentArticles = require("./functions/filters/recentArticles.js");
const compileSCSS = require("./functions/filters/compileSCSS.js");
const jsmin = require("./functions/filters/jsmin.js");
const webmentionButton = require("./functions/filters/webmentionButton.js");
const htmlmin = require("./functions/transforms/htmlmin");
const purgeInlineCSS = require("./functions/transforms/purgeInlineCSS");

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "11ty.js",
        "ico",
        "njk",
        "jpg",
        "webp",
        "png",
        "opml",
    ]);

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");

    // Filters are used in templates
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("jsmin", jsmin);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addNunjucksAsyncFilter("compileSCSS", compileSCSS);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);

    // Transforms run after HTML-generation
    eleventyConfig.addTransform("htmlmin", htmlmin);
    eleventyConfig.addTransform("purgeInlineCSS", purgeInlineCSS);

    return {
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts",
        },
    };
};
