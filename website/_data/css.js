/*
 * CSS is delivered inline in the head of each page.
 * To make sure that the CSS is generated before the pages are build,
 * the compiler is called from this data-file
 */ 
const compileCss = require("../_functions/gulp/gulp-css");

module.exports = compileCss;
