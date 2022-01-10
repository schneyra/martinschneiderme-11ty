---
title: "Eleventy 1.0"
date: 2022-01-09
excerpt: "In the changelog, I’m documenting modifications to this site that might be of interest, but are not necessarily my own ideas or work. This time it’s about the update to Eleventy 1.0 and some things that changed while updating."
tags:
    - changelog
---

Over the last three weeks, I've updated this site to [Eleventy 1.0](https://www.11ty.dev/). Technically, the update itself wasn't that complicated. This site is quite simple, it was just a change of the version in `package.json`. It's quite impressive how the already really fast build times have improved again. And while I was at it, I made some changes to the site that I've thought of for some time.

## Blogposts in Markdown

The blog posts are now stored in markdown files in the repository. While it was quite comfortable to use the WordPress backend of my other blog to write the posts, I struggled a bit with the dependency. The WordPress API delivers HTML that is generated from Gutenberg Blocks and I always had to keep in mind that there's a second consumer of the HTML when I made changes to the other site.

To transfer the posts, I simply copied the texts of the 17 blog posts from the backend to some new files in the repository. Then I had to make some adjustments to the template, added a new shortcode to generate all kinds of image sizes in blog posts and fight some things out with frontmatter to make everything work again. I also wrote [some tests in Cypress](https://github.com/schneyra/martinschneiderme-11ty/blob/main/cypress/integration/article-refactoring.js) to make sure that everything is roughly in the right place.

## New Colors and Avatar Image

I've changed the primary and secondary accent color and removed some backgrounds. I also chose a new avatar image. In my opinion, the pages are now much friendlier.

## Refactoring OG Images

I also refactored a bit of the code that generates the custom OG images for each post and even build [a little og-image-service](https://github.com/schneyra/og-image-service). I actually abandoned it about two hours after completion and decided to generate the images in the build process, but I will eventually use it to generate custom OG images for other sites.

## A New Way to Compile CSS

Finally, I moved the compile step for my SCSS to the new custom language function of Eleventy. David Darnes provided [this Gist with an example for SCSS and JS](https://gist.github.com/daviddarnes/8d70d7b8eaee474bcb19e30fc45e63ff), that my solution heavily depends on. I've added Autoprefixer via PostCSS for some backwards compatibility. I have yet to modify the function that purges and inlines the CSS into the HTML directly. But the whole CSS for this site is just about 5kb, loading a file of that size won't hurt anybody.

Tinkering on this site and its contents is always a lot of fun. I think that's mainly because working with Eleventy and all the possibilities it provides
is such a breeze. And I still haven't explored the all new world of serverless functions.
