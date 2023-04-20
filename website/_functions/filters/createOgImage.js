const Image = require("@11ty/eleventy-img");
const TextToSVG = require("text-to-svg");

const createOgImage = async (title) => {
    if (process.env.ELEVENTY_ENV !== "production") {
        return "/og-images-only-in-production.jpg";
    }

    if (!title) {
        console.error("[msme] OG image: No title given");
        return "/";
    }

    // split the given text into two parts
    let titleAsArray = title.split(" ");
    let firstPartOfTitle = [];

    if (titleAsArray.length > 3) {
        firstPartOfTitle = titleAsArray.splice(
            0,
            Math.floor(titleAsArray.length / 2)
        );
    }

    // Title
    let textToSVG = TextToSVG.loadSync();

    const optionsTitle1 = {
        x: 75,
        y: 390,
        fontSize: 50,
        attributes: { fill: "hsl(0, 0%, 95%)" }
    };
    const optionsTitle2 = {
        x: 75,
        y: 445,
        fontSize: 50,
        attributes: { fill: "hsl(0, 0%, 95%)" }
    };

    const title1 = textToSVG.getPath(firstPartOfTitle.join(" "), optionsTitle1);
    const title2 = textToSVG.getPath(titleAsArray.join(" "), optionsTitle2);

    // Website
    const optionsWebsite = {
        x: 75,
        y: 520,
        fontSize: 30,
        attributes: { fill: "hsl(108, 37%, 50%)" }
    };

    const website = textToSVG.getPath("martinschneider.me", optionsWebsite);

    let svg = (firstPartOfTitle, titleAsArray) => `
        <svg width="2400" height="1200" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="primaryGradient" gradientTransform="rotate(90)">
                <stop offset="5%"  stop-color="hsl(207, 26%, 32%)" />
                <stop offset="95%" stop-color="hsl(207, 26%, 22%)" />
                </linearGradient>
            </defs>


            <defs>
                <linearGradient id="secondaryGradient" gradientTransform="rotate(90)">
                <stop offset="5%"  stop-color="hsl(108, 37%, 50%)" />
                <stop offset="95%" stop-color="hsl(108, 37%, 45%)" />
                </linearGradient>
            </defs>

            <rect width="1200" height="600" fill="hsl(205, 55%, 10%)"/> 
            <rect width="100" height="100" x="1025" y="50" fill="url('#primaryGradient')"/> 
            <rect width="100" height="100" x="1050" y="75" fill="url('#secondaryGradient')"/>

            ${title1}
            ${title2}
            ${website}
        </svg>`;

    var buffer = Buffer.from(svg(firstPartOfTitle, titleAsArray));

    let options = {
        widths: [2400],
        formats: ["jpg"],
        outputDir: "./_site/images/og",
        urlPath: "/images/og/"
    };

    const ogImage = await Image(buffer, options);
    console.log(`[msme] OG image generated: ${title}`);
    return ogImage.jpeg[0].url;
};

module.exports = async (title, callback) => {
    const ogImageUrl = await createOgImage(title);
    callback(null, ogImageUrl);
};
