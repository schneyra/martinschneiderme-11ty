const htmlmin = require("html-minifier");

module.exports = (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
            removeComments: false,
            collapseWhitespace: true,
            removeScriptTypeAttributes: true,
            collapseBooleanAttributes: true
        });
        return minified;
    }

    return content;
};
