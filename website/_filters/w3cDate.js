module.exports = function w3cDate(value) {
    return new Date(value).toISOString().slice(0, 10);
};
