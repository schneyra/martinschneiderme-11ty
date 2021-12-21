const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
//const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const longDate = require("./website/_functions/filters/longDate.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const webmentionButton = require("./website/_functions/filters/webmentionButton.js");
const htmlmin = require("./website/_functions/transforms/htmlmin");
const purgeInlineCSS = require("./website/_functions/transforms/purgeInlineCSS");
const imageShortcode = require("./website/_functions/filters/imageShortcode");

module.exports = function (eleventyConfig) {
    console.log("👷‍♂️ Build mode: " + process.env.ELEVENTY_ENV || "development");

    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    //eleventyConfig.addPlugin(UpgradeHelper);

    eleventyConfig.setTemplateFormats(["ico", "njk", "opml", "md"]);

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");
    eleventyConfig.addPassthroughCopy("./website/images");
    eleventyConfig.addPassthroughCopy("./website/articles/**/*.(jpg|jpeg|png)");

    // Filters are used in templates
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("longDate", longDate);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    // Transforms run after HTML-generation
    if (process.env.ELEVENTY_ENV === "production") {
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
