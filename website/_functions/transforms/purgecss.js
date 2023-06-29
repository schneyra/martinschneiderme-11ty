const { PurgeCSS } = require("purgecss");

module.exports = async (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
        const [{ css: result }] = await new PurgeCSS().purge({
            content: [{ raw: content, extension: "html" }],
            css: ["website/dist/msme.min.css"],
            safelist: [
                "::-webkit-progress-bar",
                "::-webkit-progress-value",
                "::-moz-progress-bar",
                "::-ms-fill"
            ]
        });

        return content.replace(
            '<link rel="stylesheet" href="/dist/msme.min.css">',
            `<style>${result}</style>`
        );
    }

    return content;
};
