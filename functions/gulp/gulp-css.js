const { src, dest } = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("sass");
const autoprefixer = require("gulp-autoprefixer");

module.exports = () => {
    src("./website/_source/scss/**/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(dest("./website/_includes/compiledassets"))
        .on("end", function () {
            console.log("SCSS compiled");
        });
};
