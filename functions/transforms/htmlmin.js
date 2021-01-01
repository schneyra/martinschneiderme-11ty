const htmlmin = require("html-minifier");

module.exports = (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            removeScriptTypeAttributes: true,
            collapseBooleanAttributes: true
        });
        return minified;
    }

    return content;
};
