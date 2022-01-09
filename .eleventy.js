const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const sass = require("sass");

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

    // SCSS- and JS-Compilation thanks to David Darnes from:
    // https://gist.github.com/daviddarnes/8d70d7b8eaee474bcb19e30fc45e63ff
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: function (contents, inputPath) {
            if (inputPath.startsWith(`./website/_`)) {
                return;
            }

            let includesPaths = this.config.dir.includes;

            return (data) => {
                let ret = sass.renderSync({
                    file: inputPath,
                    includesPaths: ["website/_source", includesPaths],
                    data: contents
                });

                console.log(`[msme] SCSS compiled (${inputPath})`);
                return ret.css.toString("utf8");
            };
        }
    });

    // Transforms run after HTML-generation
    if (process.env.ELEVENTY_ENV === "production") {
        eleventyConfig.addTransform("htmlmin", htmlmin);
        //eleventyConfig.addTransform("purgeInlineCSS", purgeInlineCSS);
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
