---
title: "OG Images with the Eleventy Image Plugin"
date: 2021-04-04
excerpt: "In the changelog I’m documenting modifications to this site that might be of interest, but are not necessarily my own ideas or work. This time it's about OG images."
tags:
    - changelog
---

When I initially build this site, I wasn't in the mood of thinking too much about an image that would pop up when someone shares my content. Who would do it, anyway? So the `meta`-Tag that should specify the image was left commented out. Fast-forward: A few weeks ago, I read <a href="https://twitter.com/mge_de/status/1363606602008428549">this tweet</a> and the following ones. Some days later I was in that position on my couch, not laying but also not sitting, that makes my back hurt for days. I'm hanging around like this a lot in the evenings, staring at the screen of my MacBook. Actually, I was in this position until some seconds and just switched while I'm writing this sentence.

Back to the topic: Using an SVG to create a unique image for social sharing purposes sounded great. The <a href="https://github.com/11ty/eleventy-img">eleventy-img plugin</a> was already installed from <a href="/articles/using-the-eleventy-image-plugin-to-generate-images/">my previous changes to the homepage</a> and I quickly copied <a href="https://github.com/g12n/colors-and-palettes/blob/main/_data/colors.js">the code of Michaels solution</a>. It just took minutes to have a working implementation. It then took several hours on this and the following evening until I was happy with the actual outcome. I had to find out when to split the long titles of my posts and had to fiddle around with the positioning of the elements within the image. That was a lot of fun. I did not too much with SVGs on a code-level so there was a lot to learn.

{% figureElement 'website/articles/13-og-images-with-the-eleventy-image-plugin/social-sharing.jpeg', 'A screenshot how my posts look when I share them in Slack.' %}

Although I'm not finished yet: I just changed some of the colors of the site and need to put the new gradient onto that little boxes. Also, I'm not using the right font, which is <em>IBM Plex</em>, on the image.

<a href="https://github.com/schneyra/martinschneiderme-11ty/blob/main/website/_functions/helper/createOgImage.js">You can check out my code in this function</a> that I'm calling while processing the posts. As you might have noticed, I've recently made the repository to this website public. That's a big step for me and I'm still pretty insecure about showing my code to other people. Nevertheless: I hope my code is useful for someone else out there — just like Michaels was for me. Thank you!
