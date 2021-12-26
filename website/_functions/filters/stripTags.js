module.exports = function stripTags(text) {
    text = text.replace(/(<([^>]+)>)/gi, "");
    text = text.replace("\n", "");

    return text;
};
