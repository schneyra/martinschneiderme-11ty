const path = require("path");
const sass = require("node-sass");
const CleanCSS = require("clean-css");
const Terser = require("terser");
const fetch = require("node-fetch");

async function compileSCSS(completePath) {
    const promise = new Promise((resolve, reject) => {
        sass.render(
            { file: completePath, outputStyle: "compressed" },
            (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result.css.toString());
            },
        );
    });
    const result = await promise;
    return result;
}

async function minifyCSS(css) {
    return new Promise((resolve, reject) => {
        const minified = new CleanCSS().minify(css);
        if (!minified.styles) {
            return reject(minified.error);
        }
        resolve(minified.styles);
    });
}

async function getWebmentions(slug) {
    return new Promise((resolve, reject) => {
        fetch(
            `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&sort-dir=up&target=https://martinschneider.me/articles/${slug}/`,
        )
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}

function generateWebmentionHtml(mentions) {
    let html = `
    <button class="icon-button icon-button--has-text">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-button__icon" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="icon-button__text">${mentions.children.length} Webmentions</span>
    </button>`;

    return html;
}

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

    eleventyConfig.addNunjucksAsyncFilter(
        "compileSCSS",
        async (filepath, callback) => {
            const completePath = path.join(__dirname, filepath);
            const compiledCSS = await compileSCSS(completePath);
            const minifiedCSS = await minifyCSS(compiledCSS);
            callback(null, `<style>${minifiedCSS}</style>`);
        },
    );

    eleventyConfig.addNunjucksAsyncFilter(
        "displayWebmentions",
        async (slug, callback) => {
            const webmentions = await getWebmentions(slug);
            const html = generateWebmentionHtml(webmentions);
            callback(null, html);
        },
    );

    eleventyConfig.addFilter("jsmin", function (code) {
        let minified = Terser.minify(code);
        if (minified.error) {
            console.log("Terser error: ", minified.error);
            return code;
        }

        return minified.code;
    });

    return {
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts",
        },
    };
};
