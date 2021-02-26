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
        <svg width="2400" height="1200" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="600" fill="#0f131a"/> 
            <rect width="100" height="100" x="1025" y="50" fill="#87d4d4"/> 
            <rect width="100" height="100" x="1050" y="75" fill="#ff540a"/>
            <text x="75" y="390" text-anchor="left" font-size="50px" font-family="sans-serif" fill="#f3f3f3" text-rendering="optimizeLegibility">${firstPartOfTitle.join(
                " "
            )}</text>
            <text x="75" y="445" text-anchor="left" font-size="50px" font-family="sans-serif" fill="#f3f3f3" text-rendering="optimizeLegibility">${titleAsArray.join(
                " "
            )}</text>
            <text x="75" y="520" text-anchor="left" font-size="30px" font-family="monospace" fill="#87d4d4" text-rendering="optimizeLegibility">martinschneider.me</text>
        </svg>
        `;

    var buffer = Buffer.from(svg(firstPartOfTitle, titleAsArray));

    let options = {
        widths: [2400],
        formats: ["jpg"],
        outputDir: "./_site/images/og",
        urlPath: "/images/og/"
    };

    const ogImage = await Image(buffer, options);

    return ogImage.jpg[0].url;
};
