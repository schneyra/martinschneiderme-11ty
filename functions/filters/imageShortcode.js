const Image = require("@11ty/eleventy-img");

module.exports = async function imageShortcode(
    src,
    alt,
    widths,
    sizes,
    imageClass
) {
    let metadata = await Image(src, {
        widths,
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/img",
        urlPath: "img/"
    });

    let imageAttributes = {
        class: imageClass,
        alt,
        sizes,
        loading: "lazy",
        decoding: "async"
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
};
