const { src, dest, lastRun } = require("gulp");
var sass = require("gulp-sass")(require("sass"));
sass.compiler = require("sass");
const autoprefixer = require("gulp-autoprefixer");

const compileCss = () => {
    src("./website/_source/scss/**/*.scss", { since: lastRun(compileCss) })
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(dest("./website/_includes/compiledassets"))
        .on("end", function () {
            console.log("[msme] SCSS compiled");
        });
};

module.exports = compileCss;
