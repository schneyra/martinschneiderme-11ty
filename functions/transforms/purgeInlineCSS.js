// https://manu.ninja/turning-manu.ninja-up-to-11ty/#purge-css-for-each-html-file-separately

const { PurgeCSS } = require("purgecss");
const pattern = /<style>.*?<\/style>/s;

module.exports = async (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
        // get CSS from content and remove tags
        const extractedCSS = await content
            .match(/<style>(.*?)<\/style>/g)
            .map(function (val) {
                return val.replace(/<\/?style>/g, "");
            });

        const [{ css: result }] = await new PurgeCSS().purge({
            content: [{ raw: content.replace(pattern, ""), extension: "html" }],
            css: [{ raw: extractedCSS[0] }],
            safelist: [
                "::-webkit-progress-bar",
                "::-webkit-progress-value",
                "::-moz-progress-bar",
                "::-ms-fill",
            ],
        });

        return content.replace(pattern, `<style>${result}</style>`);
    }

    return content;
};
