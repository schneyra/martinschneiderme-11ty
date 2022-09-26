const { PurgeCSS } = require("purgecss");

module.exports = async (content, outputPath) => {
    if (
        outputPath.endsWith(".html") &&
        outputPath.indexOf("bookmarks/includes") === -1
    ) {
        const [{ css: result }] = await new PurgeCSS().purge({
            content: [{ raw: content, extension: "html" }],
            css: ["_site/main.min.css"],
            safelist: [
                "::-webkit-progress-bar",
                "::-webkit-progress-value",
                "::-moz-progress-bar",
                "::-ms-fill"
            ]
        });

        return content.replace(
            '<link rel="stylesheet" href="/main.min.css">',
            `<style>${result}</style>`
        );
    }

    return content;
};
