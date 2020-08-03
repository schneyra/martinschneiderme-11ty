const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;

module.exports = () => {
    src("./website/_source/jsIncludes/**/*.js")
        .pipe(uglify())
        .pipe(dest("./website/_includes/compiledassets"))
        .on("end", function () {
            console.log("JS compiled");
        });
};
