---
title: "Generating CSS With PostCSS and eleventy.before"
date: 2023-06-29
excerpt: "I'm trying to keep the setup of my personal projects as simple as possible. Today, we're looking at how CSS is generated."
---

I've been writing SCSS for many years now. But when I recently moved my [blog](https://www.dertagundich.de) from WordPress to Kirby, I decided to return to vanilla CSS.

One reason might be that I was way too lazy to spend a lot of time thinking about task runners and stuff. The other reason was that I wasn't using too many of SCSS' features. I'm not too keen on writing mixins, so it's basically the usage of variables, imports, and nesting. Those are things that modern CSS also provides, and also a lot of browser support. But not every browser does, so there's still the need for some kind of build step.

## The Goals

I've chosen PostCSS to solve my problems, and these are the things that I want it to do for me:

-   Concatenate all the CSS files that I `@import` into one big file. I'm going to use [postcss-import](https://github.com/postcss/postcss-import) for that.
-   [Autoprefixer](https://github.com/postcss/autoprefixer) is the tool of my choice to provide compatibility for older browsers.
-   Resolve the native CSS nesting with [postcss-nested](https://github.com/postcss/postcss-nested), so all browsers get CSS that they understand.
-   And finally, minify the CSS to provide the smallest possible package with [CSSNANO](https://cssnano.co/).

I actually figured all of this out some time ago when I was setting up that Kirby project. But now it's time to bring that to Eleventy since I'm just starting the process of rewriting this site.

It's quite important to me when the CSS is processed and written because I want to inline it with [PurgeCSS](https://purgecss.com/) later when the pages are written. So it has to be in place when Eleventy starts doing its magic. That idea isn't new: I saved [this article by Chris](https://chriskirknielsen.com/blog/eleventy-asset-pipeline-precompiled-assets/) some time ago, and I've been trying this myself about 2 years ago. I had to learn that the `beforeBuild` would not support async functions back then. Since, that function has been replaced by the [`eleventy.before`-Event](https://www.11ty.dev/docs/events/#eleventy.before) which is "async-friendly". After some time, I [wrote on Mastodon](https://mastodon.social/@schneyra/110623941212758892#.):

> I’m always having a lot of fun tinkering with @eleventy - until I get around that corner where something async awaits me.

## The Solution

I can't remember how many times I've tried to wrap my head around all this stuff with promises. I'm just using them not too often, so I always forget. As it tourned out, I've had to sprinkle some `await` here and there, and I needed to require `fs/promises` instead of `fs`. Here's what I came up with:

```js
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const cssnano = require("cssnano");
const postcssNested = require("postcss-nested");
const postcssImport = require("postcss-import");
const fs = require("fs/promises");

eleventyConfig.on("eleventy.before", async () => {
    await fs.mkdir("./website/css/", { recursive: true }, (err, path) => {
        if (err) throw err;
    });

    const sourceFile = "./website/_source/css/msme.css";
    const distFile = "./website/css/msme.min.css";

    const css = await fs.readFile(sourceFile, (err, css) => {
        if (err) throw err;
        return css;
    });

    await postcss([postcssImport, autoprefixer, postcssNested, cssnano])
        .process(css, {
            from: sourceFile,
            to: distFile
        })
        .then((result) => {
            fs.writeFile(distFile, result.css, () => true);
            console.log("[msme] Wrote CSS");
        });
});
```

I'm pretty happy about my little solution, which has not too many dependencies, is blazing fast and writes the CSS before the pages are generated. There are some things that I'm going to change in the future. For example, there will be more than one CSS file that the function will have to deal with. But for now, I'm really looking forward to rewriting the CSS for this site.
