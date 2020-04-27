module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "11ty.js",
    "ico",
    "njk",
    "jpg",
    "webp",
    "png"
  ]);

  eleventyConfig.addWatchTarget('./website/_source')
  
  return {
    dir: {
      input: "website",
      includes: "_includes",
      layouts: "_layouts"
    }
  }
};