/*
 * JS is delivered inline in the head of each page.
 * To make sure that the JS is generated before the pages are build,
 * the compiler is called from this data-file
 */ 
const compileJs = require("../_functions/gulp/gulp-js");

module.exports = compileJs;
