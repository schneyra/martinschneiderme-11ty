const Image = require("@11ty/eleventy-img");
const htmlmin = require("../transforms/htmlmin");

/**
 * Generates a `picture`-tag with optional `figure` for images in articles
 *
 * @param {string} src
 * @param {string} alt
 * @param {string} caption
 * @returns
 */
module.exports = async function imageShortcodeForArticles(
    src,
    alt,
    caption = false
) {
    if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    const widths = [400, 800, 1100, 2200];
    const sizes = "(min-width: 1100px) 1100px, 100vw";

    let metadata = await Image(src, {
        widths,
        formats:
            process.env.ELEVENTY_ENV === "production"
                ? ["avif", "webp", "jpeg"]
                : ["jpeg"],
        outputDir: "./_site/images/articles",
        urlPath: "/images/articles/"
    });

    let lowsrc = metadata.jpeg[0];

    let html = "";

    if (caption) {
        html += `<figure>`;
    }

    html += `<picture>
        ${Object.values(metadata)
            .map((imageFormat) => {
                return `<source type="${
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
            loading="lazy"
            decoding="async">
        </picture>`;

    if (caption) {
        html += `<figcaption>${caption}</figcaption></figure>`;
    }

    console.log(`[msme] Generated images for ${src}`);
    return html;
};
