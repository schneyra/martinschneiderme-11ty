const w3DateFilter = require("./functions/filters/w3cDate.js");
const compileSCSS = require("./functions/filters/compileSCSS.js");
const jsmin = require("./functions/filters/jsmin.js");
const webmentionButton = require("./functions/filters/webmentionButton.js");
const htmlmin = require("./functions/transforms/htmlmin");

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
    eleventyConfig.addNunjucksAsyncFilter("compileSCSS", compileSCSS);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);

    // Transforms run after HTML-generation
    eleventyConfig.addTransform("htmlmin", htmlmin);

    return {
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts",
        },
    };
};
