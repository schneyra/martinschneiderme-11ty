const w3DateFilter = require("./functions/filters/w3cDate.js");
const recentArticles = require("./functions/filters/recentArticles.js");
const webmentionButton = require("./functions/filters/webmentionButton.js");
const htmlmin = require("./functions/transforms/htmlmin");
const purgeInlineCSS = require("./functions/transforms/purgeInlineCSS");
const compileCss = require("./functions/build/gulp-css");
const compileJs = require("./functions/build/gulp-js");
const generateOptimizedImages = require("./functions/build/images");

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "ico",
        "njk",
        "jpg",
        "webp",
        "png",
        "opml"
    ]);

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");

    // Filters are used in templates
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);

    eleventyConfig.on("beforeBuild", () => {
        compileCss();
        compileJs();
        generateOptimizedImages();
    });

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
