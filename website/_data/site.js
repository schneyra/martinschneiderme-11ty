const createOgImage = require("./../_functions/helper/createOgImage");

module.exports = async () => {
    return {
        name: "Martin Schneider — Frontend Developer",
        nameXml: "Martin Schneider - Frontend Developer",
        url: "https://martinschneider.me",
        ogImage: await createOgImage("Martin Schneider Frontend Developer"),
        defaultDescription:
            "Hey, my name is Martin. I'm a frontend developer from Germany."
    };
};
