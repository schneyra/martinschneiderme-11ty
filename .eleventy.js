const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const longDate = require("./website/_functions/filters/longDate.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const webmentionButton = require("./website/_functions/filters/webmentionButton.js");
const htmlmin = require("./website/_functions/transforms/htmlmin");
const purgeInlineCSS = require("./website/_functions/transforms/purgeInlineCSS");
const imageShortcode = require("./website/_functions/filters/imageShortcode");
const imageShortcodeForArticles = require("./website/_functions/filters/imageShortcodeForArticles");
const createOgImage = require("./website/_functions/filters/createOgImage");
const stripTags = require("./website/_functions/filters/stripTags");

module.exports = function (eleventyConfig) {
    console.log(
        "[msme] Build mode: " + process.env.ELEVENTY_ENV || "development"
    );

    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(UpgradeHelper);

    eleventyConfig.setTemplateFormats(["ico", "njk", "opml", "md"]);
    eleventyConfig.addWatchTarget("./website/articles");

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");
    eleventyConfig.addPassthroughCopy("./website/images");
    eleventyConfig.addPassthroughCopy("./website/articles/**/*.(jpg|jpeg|png)");
    eleventyConfig.addPassthroughCopy({
        "./node_modules/instant.page/instantpage.js": "instantpage.js"
    });

    // Filters are used in templates
    eleventyConfig.addFilter("w3DateFilter", w3DateFilter);
    eleventyConfig.addFilter("longDate", longDate);
    eleventyConfig.addFilter("recentArticles", recentArticles);
    eleventyConfig.addFilter("stripTags", stripTags);
    eleventyConfig.addNunjucksAsyncFilter("createOgImage", createOgImage);
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksAsyncShortcode(
        "imageForArticles",
        imageShortcodeForArticles
    );

    // Transforms run after HTML-generation
    if (process.env.ELEVENTY_ENV === "production") {
        eleventyConfig.addTransform("htmlmin", htmlmin);
        eleventyConfig.addTransform("purgeInlineCSS", purgeInlineCSS);
    }

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
