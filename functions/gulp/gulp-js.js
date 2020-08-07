const { src, dest, lastRun } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const eslint = require("gulp-eslint");

const compileJs = () => {
    src("./website/_source/jsIncludes/**/*.js", { since: lastRun(compileJs) })
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(uglify())
        .pipe(dest("./website/_includes/compiledassets"))
        .on("end", function () {
            console.log("JS compiled");
        });
};

module.exports = compileJs;
