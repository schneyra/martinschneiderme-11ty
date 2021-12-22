---
title: "Building a Website With Sapper, Svelte and WordPress"
date: 2020-03-28
excerpt: "Sapper is the application framework for Svelte. An easy way to build a server side rendered single page application. (Bingo!) WordPress is used as a backend for articles like this one. Here are some details."
---

When I decided to develop a new website for myself, my first thoughts were: Should it be static, handwritten HTML, like the last one? Or should I go the oldfashioned, well-known WordPress-path? I soon decided to try something <em>really</em> new and after experimenting a bit with static site generators, I ended up wanting to try that <abbr title="JavaScript, APIs, and Markup">Jam</abbr>stack-Thing. I've experimented with both React and Vue in the past and knew that I would like to have a solution that provides Server Side Rendering (SSR). But should I try React/Next.js or should I give Vue/Nuxt.js a chance?

Well, there's some new framework in town: <a href="https://svelte.dev">Svelte</a>, which comes in a pair with <a href="https://sapper.svelte.dev">Sapper</a>, "the next small thing in web development". I decided to try it out. I was maybe a bit influenced by the opinions of my friends in the #forecastle-Slack-channel. Otherwise my first choice would have been Vue and Nuxt. Mainly because I prefer its component-structure over the one of React with that `render()`-function. ¯\_(ツ)\_/¯

To be honest: This page should be a developed as a static-site-generator-project, there is actually no need for all that SPA/SSR-stuff. I'm doing this primarily as a learning-project.

## Svelte &amp; Sapper

<em>Svelte</em> is a JavaScript-framework, with a bit different approach. Unlike React or Vue, the Svelte has it's own compiler. You are compiling the application while developing and the browser gets Vanilla-JavaScript delivered. It is not necessary to load the frameworks files while running a component. <em>Sapper</em> is the corresponding application framework, that provides routing, server side rendering, a serviceworker and much more.

As someone that likes fast loading websites with a small footprint, that sounds like my kind of JS-framework. I'm using Docker on my local maschine for development, so I took a simple Node.js-container, followed the instructions in the <a href="https://github.com/sveltejs/sapper-template">sapper-template</a>-repository. Not five minutes later, I had my first Sapper-powered website running on `localhost:3000`.

## Static Content

I don't want to go too much into the details. There are some tutorials on the web and the <a href="https://sapper.svelte.dev/docs#Getting_started">official documentation</a> is not that bad, too. After all, you're more or less just putting Svelte-Components, which consist of HTML, CSS and JavaScript in the right place and your site works. It took not more than just a few minutes to have a homepage and a simple "about me" page.

## Blogposts

Blogposts like this one are a little bit more tricky. Since I don't want to lose the comfort of a nice backend with a fully functional editor, I've created a new custom post type within the existing WordPress of my long-living blog. Fortunately WordPress provides a REST-API for most of it's contents by default. Getting the posts from WordPress is not much more than fetching the data from `https://example.com/wp-json/wp/v2/posts`. Have a look at the <a href="https://developer.wordpress.org/rest-api/reference/">API-reference</a> for more details.

To show the posts I've created two components `/articles/index.svelte` and `/articles/[slug].svelte`. They get their data from the REST-Api my WordPress provides. Again, for details see the <a href="https://sapper.svelte.dev/docs#Routing">official documentation on routing</a>, it will give you some easy to understand examples.

## Deploying with Gitlab &amp; Netlify

In the past, my deployments were mostly done by Gitlab-CI. Assets were build with Gulp or Webpack, then deployed via git and/or rsync and scp. Time for something new! I wanted to try out the services of Netlify for quite some time and was really impressed, how easy the configuration was. I just had to connect Netlify with my Gitlab-Repository and tell them what script should be executed. Now, everytime I push the master of my repository, `npm run sapper export` will run and a fresh version of my website will be deployed in less than a minute.

To trigger a Netflify-deployment from WordPress, I've installed the <a href="https://wordpress.org/plugins/deploy-netlifypress/">Deploy with NetlifyPress</a>-Plugin, which triggers Netlify via webhook every time I publish or update a post.

## What's next?

This website is now some kind of <abbr title="minimum viable product">MVP</abbr>. Especially the blogging-part lacks some features. First, I'll implement an good old RSS-Feed along with a sitemap for SEO. Then, there should be webmentions, definately. Since I'm surely going to show some lines of code in the future, I'll have to integrate <a href="https://prismjs.com/">Prism</a> for nice highlighting.

There are going to be tests! Sapper suggests to use <a href="https://www.cypress.io/">cypress</a> and I think I'll give it a try in the future. And maybe some automated <a href="https://github.com/GoogleChrome/lighthouse-ci">lighthouse-ci</a>-testing will help me to keep the page as fast as it is at the moment.

So many ideas, so little time. I'll keep you posted. As long as there is no RSS to subscribe, you could follow me on my <a href="https://twitter.com/schneyra/">twitter</a>. I appreciate feedback!
