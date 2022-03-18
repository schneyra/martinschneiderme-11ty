const Image = require("@11ty/eleventy-img");

/**
 * Generates a `<picture>` element
 *
 * @returns
 */
module.exports = async function pictureElementShortcode(options) {
    let {
        src = null,
        alt = null,
        widths = null,
        sizes = null,
        pictureElementClasses = "",
        imageElementClasses = "",
        lazyloading = true
    } = options;

    if (!src || !alt || !widths || !sizes) {
        console.warn(
            `[msme] Missing \`src\` or \`widths\` or \`sizes\` on image from: ${src}`
        );

        return;
    }

    let metadata = await Image(src, {
        widths,
        formats:
            process.env.ELEVENTY_ENV === "production"
                ? ["avif", "webp", "jpeg"]
                : ["jpeg"],
        outputDir: "./_site/images",
        urlPath: "/images/"
    });

    let lowsrc = metadata.jpeg[0];

    pictureElementClasses = pictureElementClasses
        ? `class="${pictureElementClasses}"`
        : "";
    imageElementClasses = imageElementClasses
        ? `class="${imageElementClasses}"`
        : "";

    if (process.env.ELEVENTY_ENV === "production") {
        console.log(`[msme] Generated images for ${src}`);
    }

    return `<picture ${pictureElementClasses}>
        ${Object.values(metadata)
            .map((imageFormat) => {
                return `  <source type="${
                    imageFormat[0].sourceType
                }" srcset="${imageFormat
                    .map((entry) => entry.srcset)
                    .join(", ")}" sizes="${sizes}">`;
            })
            .join("\n")}
        <img
            src="${lowsrc.url}"
            width="${lowsrc.width}"
            height="${lowsrc.height}"
            alt="${alt}"
            ${imageElementClasses}
            ${lazyloading ? 'loading="lazy"' : ""}
            decoding="async">
        </picture>`;
};
