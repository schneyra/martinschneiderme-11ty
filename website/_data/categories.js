const fetch = require("node-fetch");

async function getCategories() {
    try {
        const response = await fetch(
            `https://www.dertagundich.de/wp-json/wp/v2/msme_categories`,
            //`http://host.docker.internal/wp-json/wp/v2/msme_categories`,
        );

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = getCategories;
