const createOgImage = require("./../../functions/helper/createOgImage");

module.exports = async () => {
    return {
        name: "Martin Schneider — Frontend Developer",
        nameXml: "Martin Schneider - Frontend Developer",
        url: "https://martinschneider.me",
        ogImage: await createOgImage("Martin Schneider Frontend Developer")
    };
};
