const Image = require("@11ty/eleventy-img");

module.exports = async function imageShortcode(src, alt, widths, sizes, pictureClass, imageClass) {
    if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
    }

    let metadata = await Image(src, {
        widths,
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/images",
        urlPath: "/images/"
    });

    let lowsrc = metadata.jpeg[0];

    return `<picture class="${pictureClass}">
        ${Object.values(metadata).map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
        }).join("\n")}
        <img
            src="${lowsrc.url}"
            width="${lowsrc.width}"
            height="${lowsrc.height}"
            alt="${alt}"
            class="${imageClass}"
            loading="lazy"
            decoding="async">
        </picture>`;
}