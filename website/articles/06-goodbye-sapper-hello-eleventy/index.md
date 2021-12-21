---
title: "Goodbye Sapper, hello Eleventy!"
permalink: "/articles/goodbye-sapper-hello-eleventy/"
layout: article
date: 2020-05-13
excerpt: "Sometimes things change fast: Just about two months after I launched this website with the SSR-Framework Sapper I'm replacing it with a site that is generated with the static site generator Eleventy. Let me explain."
---

In the <a href="/articles/building-a-website-with-sapper-and-wordpress/">article about the building of the Sapper-version</a> of this site, I wrote:

> "To be honest: This page should be a developed as a static-site-generator-project, there is actually no need for all that SPA/SSR-stuff. I’m doing this primarily as a learning-project."

And although I had a lot of fun with Svelte and Sapper and really liked the concept of the framework, it always bugged me that I had this pretty simple and fast site that also caused about double the traffic it actually needed. Not speaking of the in my case really unnecessary hydration-part that hands over the routing to JavaScript. So while I really liked the site itself and enjoyed writing the first articles, I always had that "this is not right"-feeling. There are use cases for SSR/SPA-frameworks - my little homepage isn't one.

## Why not Eleventy in the first place?

When I was initially rebuilding my site, I gave some tools a try and even had a first look at Eleventy. Because the idea of building something with completely different tools was born out of reluctance of my current work and being overwhelmed by the current situation, I was searching for <em>fast</em> results. I think mainly to feel better. And given the constraint that I wanted the content hosted in my good old WordPress, choosing Sapper was more obvious. It gave me fast and actually good results. <em>But there was this feeling.</em>

Over the weeks I managed to get back some structure, especially in the evenings. I was able to play around with some code for one or two hours before I was too tired and began to make those stupid mistakes you make, when the eyes get tired and small. Since I've mainly worked in PHP-based environments in the past, I also had the chance to get more confident working in a Node.js environment. And finally I overthought my goals: I want to learn something new. But it has to be something I really like.

## So it's Eleventy. But why?

When I decided to move away from the SSR-based site, I went back straight to Eleventy. I've again read some articles about it and was maybe a bit influenced by <a href="https://annualbeta.com">Søren</a>, who is some kind of 11ty-evangelist.

<a href="https://www.11ty.dev/">Eleventy</a> is the answer to my biggest concern about the site I build with Sapper: It's a static site generator. No hydration, just as much client-side JavaScript as I write it. It's generating exactly what I need to deliver my content to users: HTML pages, some CSS, a bit of JavaScript for some enhancements.

It supports a bunch of template engines and it can also work with data that is fetched from an API. It runs in a Node.js environment, so I do get the chance to get more routine in writing modern JavaScript. That's one of my main goals and another reason why I chose the Jamstack.

Apart from that I really like the community around the software. There are plenty of like minded people that love to build great websites and share my passion for blogging. The amount of unread blogposts in my Pocket-account is rising every day. Hopefully, I can give some things back.

## What’s next?

Well, first: More content. I have some raw drafts in the backend and also one or two ideas that I could implement into this site. Then: Some optimization and cleanup. I am mostly <em>learning by doing</em> so this page is a repository consisting of some thrown-together and latenight-written code. And maybe I'll return to Svelte with a little side project. We'll see.

I've tinkered a bit with end-to-end- and accessibility-testing, but that topic will need some further investigation. Feel free to subscribe to my <a href="/articles/feed.xml">RSS-Feed</a> or <a href="https://twitter.com/schneyra">follow <em>@schneyra</em> on twitter</a>.
