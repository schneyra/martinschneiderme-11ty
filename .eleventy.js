const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
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
const imageShortcode = require("./website/_functions/filters/imageShortcode");
const imageShortcodeForArticles = require("./website/_functions/filters/imageShortcodeForArticles");
const createOgImage = require("./website/_functions/filters/createOgImage");
const stripTags = require("./website/_functions/filters/stripTags");

module.exports = function (eleventyConfig) {
    console.log("[msme] Build mode: " + process.env.ELEVENTY_ENV);

    // PLUGINS
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);

    // FILE HANDLING
    eleventyConfig.setTemplateFormats(["ico", "njk", "opml", "md"]);
    eleventyConfig.addWatchTarget("./website/articles");

    eleventyConfig.addWatchTarget("./website/_source");
    eleventyConfig.addPassthroughCopy("./website/fonts");
    eleventyConfig.addPassthroughCopy("./website/images");
    eleventyConfig.addPassthroughCopy("./website/articles/**/*.(jpg|jpeg|png)");
    eleventyConfig.addPassthroughCopy({
        "./node_modules/instant.page/instantpage.js": "instantpage.js"
    });

    // FILTERS
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

            return () => {
                let ret = sass.compile(inputPath);

                const css = ret.css.toString("utf8");

                return postcss([autoprefixer])
                    .process(css, { from: inputPath })
                    .then((result) => {
                        result.warnings().forEach((warn) => {
                            console.warn(warn.toString());
                        });

                        console.log(`[msme] SCSS compiled (${inputPath})`);
                        return result.css;
                    });
            };
        }
    });

    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "js",
        compile: function (contents, inputPath) {
            if (inputPath.startsWith(`./website/_`)) {
                return;
            }

            return async (data) => {
                let ret = await terser.minify(contents);
                return ret.code;
            };
        }
    });

    // TRANSFORMS
    if (process.env.ELEVENTY_ENV === "production") {
        eleventyConfig.addTransform("htmlmin", htmlmin);
        // purgeCSS needs to be rewritten to work with the linked css-file
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
