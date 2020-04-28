const path = require("path");
const sass = require("node-sass");
const CleanCSS = require("clean-css");

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

    eleventyConfig.addNunjucksAsyncFilter(
        "compileSCSS",
        async (filepath, callback) => {
            const completePath = path.join(__dirname, filepath);
            const compiledCSS = await compileSCSS(completePath);
            const minifiedCSS = await minifyCSS(compiledCSS);
            callback(null, `<style>${minifiedCSS}</style>`);
        },
    );

    return {
        dir: {
            input: "website",
            includes: "_includes",
            layouts: "_layouts",
        },
    };
};
