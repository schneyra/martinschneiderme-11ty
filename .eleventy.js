const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const webmentionButton = require("./website/_functions/filters/webmentionButton.js");
const htmlmin = require("./website/_functions/transforms/htmlmin");
const purgeInlineCSS = require("./website/_functions/transforms/purgeInlineCSS");
const imageShortcode = require("./website/_functions/filters/imageShortcode");

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats(["ico", "njk", "opml"]);

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");
    eleventyConfig.addPassthroughCopy("./website/images");

    // Filters are used in templates
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    // Transforms run after HTML-generation
    if (process.env.ELEVENTY_ENV !== "development") {
        eleventyConfig.addTransform("htmlmin", htmlmin);
        eleventyConfig.addTransform("purgeInlineCSS", purgeInlineCSS);
    }

    return {
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
