const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
const { AssetCache } = require("@11ty/eleventy-cache-assets");

/**
 * Converts fs.readfile to a promised version
 * @see https://stackoverflow.com/a/46867579
 */
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function subscriptions() {
    let asset = new AssetCache("subscriptions");

    // check if cached
    if (asset.isCacheValid("1d")) {
        return asset.getCachedValue();
    }

    // load file and convert it
    const filePath = path.join(__dirname, "../blogroll/subscriptions.opml");
    let subscriptions;

    await readFile(filePath, { encoding: "utf-8" })
        .then((xml) => {
            parseString(xml, (err, json) => {
                if (!err) {
                    subscriptions = json.opml.body[0].outline;
                } else {
                    console.error("Error converting XML to JSON.");
                }
            });
        })
        .catch(() => console.error("Error loading file."));

    await asset.save(subscriptions, "json");

    return subscriptions;
}

module.exports = subscriptions;
