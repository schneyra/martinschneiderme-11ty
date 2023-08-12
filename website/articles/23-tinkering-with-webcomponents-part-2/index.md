---
title: "Tinkering with Web Components – Part 2"
date: 2023-06-27
excerpt: "In part two of my little web components experiment I'm solving the problems from part one and release a package at npm."
tags: "js"
---

About a year and a half ago, I spent some time [tinkering with web components](/articles/tinkering-with-web-components/). I wasn't too happy about the outcome of my research at this point; both ways of styling the component weren't good enough, in my opinion. So I wrote the article and tweeted about my dilemma.

Let's remember that these were the solutions that I came up with:

-   I have an implementation of my web component that needs a lot of styling information. Check it out: [Native Sharing Web Component
    ](https://codepen.io/schneyra/pen/qBVWpBB). I don't feel too good with the idea to put the whole styling into a data attribute on the DOM.
-   And then there's the easier to style solution [Native Sharing Web Component with is-Attribute and Polyfill
    ](https://codepen.io/schneyra/pen/xxPxvow). That's the one that only works in the targeted browser when an additional 2 kB of JavaScript is applied which is in this particular case way too much.

Luckily, [Mario](https://mariohamann.de/) somehow got aware of my first post and provided two solutions to my problem. One of them was:

> You could try to use LightDOM instead of ShadowDOM

So I got back to Codepen and wrote a third implementation. This time, my component is rendering the button as a child of its own tag right in the DOM of the webpage. This way, I can use the CSS provided by the page to style the sharing button. You can check out the code for my [Native Sharing Web Component on Codepen](https://codepen.io/schneyra/pen/dyJMXLa).

I was so happy with that solution that I went even further and created my first package on npm that day. Feel free to use the [msme-sharing-button](https://www.npmjs.com/package/msme-sharing-button) on your own page. If you're using Safari, you can see the button under each article..

In conclusion, I think that web components are a pretty neat way to extend HTML elements and the functionality of a website. I like the idea of creating elements with APIs and functions that are provided by the browser itself. But it's also a bit of a challenge to rewire my thinking. We will see what I come up with next.
