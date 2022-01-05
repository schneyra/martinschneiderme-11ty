module.exports = function longDate(value) {
    return new Date(value).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};
