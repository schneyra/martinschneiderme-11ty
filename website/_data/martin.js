const Image = require("@11ty/eleventy-img");

async function createAvatarImage() {
    const image = await Image("./website/_source/images/avatar.jpg", {
        formats: ["jpeg"],
        outputDir: "./_site/images",
        urlPath: "/images/"
    });

    return image.jpeg[0].url;
}

module.exports = async () => {
    return {
        name: "Martin Schneider",
        url: "https://martinschneider.me",
        email: "hallo@martinschneider.me",
        jobtitle1: "Frontend-Developer",
        jobtitle2: "Diplom Informatiker (FH)",
        image: "./website/_source/images/avatar.jpg",
        imagePath: await createAvatarImage(),
        sameAs: [
            {
                name: "blog",
                url: "https://www.dertagundich.de/",
                title: "My personal blog"
            },
            {
                name: "github",
                url: "https://github.com/schneyra/",
                title: "My account on Github"
            },
            {
                name: "mastodon",
                url: "https://mastodon.social/@schneyra",
                title: "My account on mastodon"
            },
            {
                name: "twitter",
                url: "https://www.twitter.com/schneyra/",
                title: "My account on twitter"
            },
            {
                name: "linkedin",
                url: "https://www.linkedin.com/in/martin-schneider-b941bb5b/",
                title: "My account on linkedin"
            },
            {
                name: "xing",
                url: "https://www.xing.com/profile/Martin_Schneider68/cv",
                title: "My account on XING"
            }
        ]
    };
};
