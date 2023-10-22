---
title: "Two Point Zero"
date: 2023-10-22
excerpt: "After two years it was time to have a look at the current state of this site and make some adjustments."
tags: "eleventy"
---

And then it took me about six months and a lot of back and forth until I was finally satisfied enough to merge that branch that I've named "2.0" into the main. I've made several changes to the site over the last two years. But this time I got rid of almost every markup except the really necessary and started to develop everything around from the ground up, and also made some significant design changes. One of my biggest goals was to simplify everything about this site as much as possible, since I don't want to spend that much time maintaining it and I had the problem to remember how things are working here from time to time.

## A simpler build step

I've drastically simplified the building of the CSS and JavaScript assets of this site. I've already written about my current approach on [generating CSS in Eleventy](/articles/generating-css-with-postcss-and-eleventy-before/). Likewise, I'm also prepared to take care of JavaScript in a pretty similar way, but since I've removed the dark mode of the site for now, the only client side JavaScript is a service worker, so there's no need for that at the moment.

## Going static (again)

One of my goals when I initially started this page was to learn a new stack of web development and leave the well known paths of the WordPress-PHP-CMS-World that I've been working in forever. And that, although I've been very happy with Kirby as a CMS lately. Building a static site was somehow a step back to the roots in the late 90s and felt good. And while [exploring the server side functions of well known Jamstack hosting providers](/articles/fetching-webmentions-with-netlify-and-eleventy-edge/) was kind of fun, it was bringing some kind of dependency and complexity to the page that isn't really necessary. So I've removed all of that again. The list of webmentions are now generated at build time, and I really don't care if they're up-to-date. Actually, there isn't too much mentioning of this site happening after all, so it's just wasted energy on a server to regenerate the same list on every page load.

## Some things for the future

I've removed the blogroll for now, but I'm planning the page back in a new way. The current approach with a computed OPML-file didn't feel right after I've started to subscribe to more sites in the last months. I'm also planning to build a "projects" page to show some of the things that I'm working on from time to time.

But for now I'm happy with the results of my work of the last months. So I'm quickly merging the changes before I throw everything away for the third time and start redesigning again. To be completely honest, this has not turned out as that masterpiece of web development that I might have dreamed about. But where's the fun if there's nothing to refactor?
