---
title: "Adding Webmentions to My Website"
layout: article
date: 2020-04-13
excerpt: "Webmention is a webstandard that enables websites to notify each other when content is mentioned, liked or linked. This is my little journey how I have implemented them into my website."
---

One reason to write posts like this one is sharing my learnings and I'm looking forward to get as much feedback as possible. For the things I write about as well as my hopefully evolving writing skills. Implementing the ability to display webmentions gives me the chance to collect some of the feedback. I've oriented myself roughtly by <a href="https://mxb.dev/blog/using-webmentions-on-static-sites/">this guide by Max Böck</a>. Although he wrote it based on his implementation for his 11ty-based site, I was able to follow his steps. Thank you! Understanding the mechanisms and the interaction between the different tools was actually harder than the actual implementation.

## Preparing the Website for IndieAuth and Webmention

Before I was able to start implementing the feature on my site, I needed to update the templates and place some microformat-classes in my markup to make my content accessible for the software parsing it when getting mentioned or mentioning myself.

Also, the services I'm going to use require an authentication based on <a href="https://indieauth.com/">IndieAuth</a>. I'll have to use the website to identify myself by connecting it to my existing <em>identities</em> (read: accounts) on the web. The guides on <a href="https://indiewebify.me/">IndieWebify.Me</a> helped me a lot to become a citizen of the <em>IndieWeb</em>.

## Getting an Endpoint to Collect Webmentions

Now beeing able to identify myself, the next step was "implementing" an endpoint to receive mentions. Well - instead of hosting the software myself, I made an account on <a href="https://webmention.io/">webmention.io</a> and added the given HTML-Tags into the header of my template.

```html
<link
    rel="webmention"
    href="https://webmention.io/martinschneider.me/webmention"
/>
<link rel="pingback" href="https://webmention.io/martinschneider.me/xmlrpc" />
```

One quick deployment later, my site was able to receive direct mentions.

## Collecting Mentions From the Internet

In order to collect other than direct webmentions, for example from tweets, someone has to search the different platforms and ping my site. <a href="https://brid.gy/">Bridgy</a> is a service that searches twitter, github, instagram and many others. For example: When a tweet is mentioning one of my posts, a webmention will be send to the URL used in that tweet. Activating that service was easy, I simply had to log in using my twitter account.

## Displaying the Mentions for a Post

Finally, some coding! I was almost disappointed about that part. It was mainly a simple <code>fetch()</code> against the URL provided by webmention.io, extended with some parameters for filtering the specific URL and sorting.

```html
https://webmention.io/api/mentions.jf2?domain=${domain}&amp;sort-dir=up&amp;target=${targetBase}${slug}/
```

Then some templating to show the different types of mentions like "like-of", "repost-of" or "in-reply-to" and some CSS. That file named <code>Webmention.svelte</code> is quite boring. At least for the moment. I'll see if and how the mentions will be used and optimize here and there.

## Notifying other Pages

Now that my website is able to receive mentions, why shouldn't it send them as well? Luckily, there's a service providing that feature: <a href="https://webmention.app/">webmention.app</a> will be pinged after each <a href="https://webmention.app/docs#how-to-integrate-with-netlify">deployment by Netlify</a>, scan my RSS-Feed for links to other sites and try to ping them.

## Webmention and GDPR

When I was mentioning on twitter that my site is now supporting Webmention, <a href="https://knuspermagier.de/">Philipp</a> pointed out that there's no way to actively consent on displaying personal data on my site. He's right.

First, I'd like to thank Philipp for his non-mentioning-webmention-related-tweet. as I wrote in the very first sentence of this post (actually before Philipp was tweeting), I'm trying to get as much feedback and learn as much as possible. To be honest: I forgot about GDPR-implications.

I thought about this quite a lot, read what others where thinking about that topic (Sebastian Greger has a very long post about "<a href="https://sebastiangreger.net/2018/05/indieweb-privacy-challenge-webmentions-backfeeds-gdpr/">The Indieweb privacy challenge</a>" which I will surely include in my changes to that part of the posts.) and decided that I'm at the moment with <em>perspective 1</em> as described by the <a href="https://indieweb.org/GDPR#Perspective_1">Indieweb-Wiki</a>. This is a completely private site <em>"by a natural person in the course of a purely personal or household activity"</em> and I spare you my rant about that topic.

## Finally

It was fun to learn about Webmention and how it is working, what possibilities and services there are and problems there might be. It was fun to build something for me completely new. I'm really looking forward to build more things like that in the future.
