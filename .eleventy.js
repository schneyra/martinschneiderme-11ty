const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const path = require("path");
const sass = require("sass");
const terser = require("terser");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");

const w3DateFilter = require("./website/_functions/filters/w3cDate.js");
const longDate = require("./website/_functions/filters/longDate.js");
const recentArticles = require("./website/_functions/filters/recentArticles.js");
const webmentionButton = require("./website/_functions/filters/webmentionButton.js");
const htmlmin = require("./website/_functions/transforms/htmlmin");
const purgeInlineCSS = require("./website/_functions/transforms/purgeInlineCSS");
const pictureElementShortcode = require("./website/_functions/filters/pictureElementShortcode");
const figureShortcodeForArticles = require("./website/_functions/filters/figureShortcodeForArticles");
const createOgImage = require("./website/_functions/filters/createOgImage");
const stripTags = require("./website/_functions/filters/stripTags");

module.exports = function (eleventyConfig) {
    console.log("[msme] Build mode: " + process.env.ELEVENTY_ENV);

    // PLUGINS
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(directoryOutputPlugin);

    eleventyConfig.setQuietMode(true);

    // FILE HANDLING
    eleventyConfig.setTemplateFormats(["ico", "njk", "opml", "md"]);
    eleventyConfig.addWatchTarget("./website/articles");

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");
    eleventyConfig.addPassthroughCopy("./website/images");
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
    eleventyConfig.addNunjucksAsyncFilter("webmentionButton", webmentionButton);
    eleventyConfig.addNunjucksAsyncFilter(
        "mangleJs",
        async (code, callback) => {
            const mangledCode = await terser.minify(code);
            callback(null, mangledCode.code);
        }
    );

    eleventyConfig.addNunjucksAsyncShortcode(
        "pictureElement",
        pictureElementShortcode
    );

    eleventyConfig.addNunjucksAsyncShortcode(
        "figureElement",
        figureShortcodeForArticles
    );

    // SCSS- and JS-Compilation thanks to David Darnes from:
    // https://gist.github.com/daviddarnes/8d70d7b8eaee474bcb19e30fc45e63ff
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "min.css",
        compile: (contents, inputPath) => {
            let parsed = path.parse(inputPath);

            if (parsed.name.startsWith("_")) {
                return;
            }

            return (data) => {
                let ret = sass.compile(inputPath, {
                    style: "compressed"
                });
                console.log(`[msme] SCSS compiled (${inputPath})`);
                return ret.css;
            };
        }
    });

    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "min.js",
        compile: function (contents, inputPath) {
            let parsed = path.parse(inputPath);

            if (parsed.name.startsWith("_") || parsed.dir !== "./website/js") {
                return;
            }

            return async () => {
                let ret = await terser.minify(contents);
                console.log(`[msme] JS compiled (${inputPath})`);
                return ret.code;
            };
        }
    });

    // TRANSFORMS
    eleventyConfig.addTransform("purgeInlineCSS", purgeInlineCSS);
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
