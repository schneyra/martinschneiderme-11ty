module.exports = function stripTags(text) {
    text.replace(
        /(<([^>]+)>)/gi,
        ""
    );

    text.replace("\n", "");

    return text;
};
