const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;

/**
 * Converts fs.readfile to a promised version
 * @see https://stackoverflow.com/a/46867579
 */
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function subscriptions() {
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

    return subscriptions;
}

module.exports = subscriptions;
