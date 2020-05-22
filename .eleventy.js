const w3DateFilter = require("./functions/w3cDate.js");
const compileSCSS = require("./functions/compileSCSS.js");
const jsmin = require("./functions/jsmin.js");
const webmentionButton = require("./functions/webmentionButton.js");
const htmlmin = require("./functions/htmlmin");

module.exports = function (eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "11ty.js",
        "ico",
        "njk",
        "jpg",
        "webp",
        "png",
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
