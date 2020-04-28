/**
 * https://github.com/maxboeck/eleventastic/blob/master/src/assets/styles/styles.11ty.js
 */

const path = require("path");
const sass = require("node-sass");
const CleanCSS = require("clean-css");

const ENTRY_FILE_NAME = "main.scss";

module.exports = class {
    async data() {
        const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`);
        return {
            permalink: `/dist/css/main.css`,
            eleventyExcludeFromCollections: true,
            entryPath,
        };
    }

    async compile(config) {
        return new Promise((resolve, reject) => {
            return sass.render(config, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result.css.toString());
            });
        });
    }

    async minify(css) {
        return new Promise((resolve, reject) => {
            const minified = new CleanCSS().minify(css);
            if (!minified.styles) {
                return reject(minified.error);
            }
            resolve(minified.styles);
        });
    }

    // render the CSS file
    async render({ entryPath }) {
        try {
            const css = await this.compile({ file: entryPath });
            const result = await this.minify(css);
            return result;
        } catch (err) {
            console.error(err);
            const msg = err.formatted || err.message;
            return this.renderError(msg);
        }
    }
};
