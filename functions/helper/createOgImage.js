const Image = require("@11ty/eleventy-img");

module.exports = async function createOgImage(title) {
    let titleAsArray = title.split(" ");
    let firstPartOfTitle = [];

    if (titleAsArray.length > 3) {
        firstPartOfTitle = titleAsArray.splice(
            0,
            Math.floor(titleAsArray.length / 2)
        );
    }

    let svg = (firstPartOfTitle, titleAsArray) => `
            <svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="600" fill="#0f131a"/> 
            <rect width="50" height="50" x="1050" y="25" fill="#87d4d4"/> 
            <rect width="50" height="50" x="1125" y="25" fill="#ff540a"/> 
            <text x="75" y="410" text-anchor="left" font-size="40px" font-family="sans-serif" fill="#f3f3f3" text-rendering="optimizeLegibility">${firstPartOfTitle.join(
                " "
            )}</text>
            <text x="75" y="465" text-anchor="left" font-size="40px" font-family="sans-serif" fill="#f3f3f3" text-rendering="optimizeLegibility">${titleAsArray.join(
                " "
            )}</text>
            <text x="75" y="530" text-anchor="left" font-size="20px" font-family="monospace" fill="#87d4d4" text-rendering="optimizeLegibility">martinschneider.me</text>
            </svg>
            `;

    var buffer = Buffer.from(svg(firstPartOfTitle, titleAsArray));

    let options = {
        widths: [1200],
        formats: ["jpg"],
        outputDir: "./_site/images/og",
        urlPath: "/images/og/"
    };

    const ogImage = await Image(buffer, options);

    return ogImage.jpg[0].url;
};
