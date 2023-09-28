const AverageColorNode = require("fast-average-color-node");

module.exports = async function averageColor(src) {
    if (!src) {
        return null;
    }

    return (averageColor = await AverageColorNode.getAverageColor(src));
};
