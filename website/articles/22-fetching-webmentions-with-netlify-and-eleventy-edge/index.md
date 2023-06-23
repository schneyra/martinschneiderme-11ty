---
title: "Fetching Webmentions With Netlify and Eleventy Edge"
date: 2023-06-23
excerpt: "Sadly, I'm not too good at documenting what I'm sometimes building in that little free time that I have. At the end of last year I've implemented a interesting feature on this site, but never wrote about it."
---

As you might have seen, [this site supports Webmentions](/articles/adding-webmentions-to-my-website/). They are displayed under each article and I'm collecting them using a service called [webmention.io](https://webmention.io/). For the longest time, I was doing this at build time, which means that I had to trigger a build at Netlify to update the Webmentions on my site. While it isn't too hard to automate that task, it wasn't quite the fulfilling experience to me. So I was quite interested in trying out the [Edge-Plugin for Netlify](https://www.11ty.dev/docs/plugins/edge/), which "is an exciting new way to add dynamic content to your Eleventy templates".

## The Implementation

It actually didn't take too much time to add that dynamic content in a exciting new way to my templates, since I already had all the necessary code. I just had to put it at some other places after I've installed the Plugin as it is described in it's documentation. Then I wrapped the existing code in my template in a special edge-tag that the plugin provides.

The second step was putting the existing code that fetches the webmentions into a Netlify Edge Function. It now looks like this:

```js
import {
    EleventyEdge,
    precompiledAppData
} from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
    try {
        let edge = new EleventyEdge("edge", {
            request,
            context,
            precompiled: precompiledAppData,

            // default is [], add more keys to opt-in e.g. ["appearance", "username"]
            cookies: []
        });

        let slug = edge.url.pathname;

        const webmentionsResponse = await fetch(`https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=200&sort-dir=up&target=https://martinschneider.me${slug}`);
        const webmentions = await webmentionsResponse.json();

        edge.config((eleventyConfig) => {
            eleventyConfig.addGlobalData('webmentions', webmentions)
        });

        return await edge.handleResponse();
    } catch (e) {
        console.log("ERROR", { e });
        return context.next(e);
    }
};
```

The last step that I remember was telling Netlify when to call that function. You'll tell them in your "netlify.toml".

```toml
[[edge_functions]]
function = "eleventy-edge"
path = "/articles/*"
```

I'm pretty sure there was some back and forth until everything was working as expected, but that was pretty much it.

## The Pros

Well, that was fun to build and now there are always the latest Webmentions shown when you open a page on this site.

## The Cons

First there's that thing with the avatars: They are loaded in their full glory from webmention.io and I've never found time and the right mood to make them smaller on the fly.

I haven't measured it, but I think the dynamic pages are now a little bit less "snappy" as the others. They're still fast, but the _feeling_ is different. And what really bothers me: I've [chosen Eleventy over Sapper](/articles/goodbye-sapper-hello-eleventy/) explicitly because it's a static site generator and I did not want to be dynamic in any way. I _wanted_ to be static. So that implementation feels like a step back, especially with the knowledge that I'm bound to a certain hosting provider with that solution.

## Back to the Roots

I'm working on a new version of this site. It'll be Eleventy again. But it will be really static. Maybe I'll have to post more often so there are more rebuilds of the site.