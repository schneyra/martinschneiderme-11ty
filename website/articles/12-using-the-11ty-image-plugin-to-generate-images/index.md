---
title: "Using the Eleventy Image Plugin to Generate Images"
date: 2021-03-03
excerpt: "In the changelog I'm documenting  modifications to this site that might be of interest, but are not necessarily my own ideas or work."
tags:
    - articles
    - changelog
---

When I initially build the homepage of this website, I generated the used image sizes by hand and converted them to WebP with an online image converter. That was a bit of pain, but since I needed to do it only once I did not want to spend the time to automate it.

The image sizes and file formats for images in the articles are generated while uploading them to the WordPress backend. With the rising support of the AVIF image format and the wish to output the images in different sizes, it was time to begin bring the image generation to the build process of the site. Fortunately, there's the <a href="https://github.com/11ty/eleventy-img">eleventy-img plugin</a>, a utility that wraps around the sharp image processor to generate image sizes and formats.

I played around with the plugin on some evenings until I build a shortcode that fits my needs and I'm pretty happy with it. Image generation is pretty fast and modern browsers like Chrome (and soon Firefox) now deliver the much smaller files. Since I have just been building a similar functionality for my WordPress blog in PHP with Cloudinary as backend, I am really happy to benefit from <a href="https://www.zachleat.com/web/eleventy-image/">Zachs work</a> and did not have to implement all on my own.

The next step is downloading and processing the images in the articles while building the site. That shouldn't be too complicated once I decided how to mark the images in the API output.

If you're interested in my solution, have a look at the commits in my repository on Github or check out <a href="https://github.com/schneyra/martinschneiderme-11ty/blob/main/website/_functions/filters/imageShortcode.js">the final version of the function</a>.

<h2>Related commits:</h2>

-   [image-generation with eleventy-img](https://github.com/schneyra/martinschneiderme-11ty/commit/13f7a7654219bf8a9bc46e5d22f7e4175ec6d218)
-   [all images on homepage are now generated with 11ty-img](https://github.com/schneyra/martinschneiderme-11ty/commit/91098252d7be26e9a184c3ad1d526dca07ee525e)
-   [generate more images to serve better pictures on hi-dpi screens](https://github.com/schneyra/martinschneiderme-11ty/commit/d635f7613fc84eef18e8ff08fb6a036a530306ee)
