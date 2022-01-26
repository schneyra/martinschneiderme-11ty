---
title: "Tinkering with Web Components"
date: 2022-01-26
excerpt: "Today I found some free time to try out an idea that I had in mind for quite some time. I tried to refactor a part of this site to a web component. I've ended with mixed feelings."
---

Although I really dig the idea of reusable custom elements and have read more than one article on the topic, I never actually used or even created a web component yet. I was time to change this and so I started with an open tab on CodePen and an open tab on the ["Using custom elements" tutorial on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). The plan was to convert [this sharing button](https://martinschneider.me/articles/creating-a-sharing-button-with-the-web-share-api/) into a reusable web component that I could easily introduce on my other sites.

As it turned out, building the component itself wasn't that big of a challenge. The chosen part of the site is more or less just an `if` and an `addEventListener()`. That's the kind of complexity of JavaScript that I like and normally write. Thanks to the awesome work of the editors at MDN, it was a breeze to convert that code to my very first custom element `<msme-sharing-button>`.

Then I thought about the styling of the button and that seems to be the hard part here: Since the button is rendered on the shadow DOM the CSS of the surrounding site won't have control over it. I've expected that and that's a good thing as long as I'm operating within a closed system. In my case the buttons on my sites are quite different in terms of size, spacing, fonts, colors, hover effects and so on. My first idea was to define a set of CSS custom properties to inject the necessary information. But that set got bigger and more complicated with every minute I thought about it.

Some research brought me to the HTML `is` attribute, which is a different way to bind a web component to an existing element in order to extend it's function. `<button is="msme-sharing-button" ...` should be the solution! Then I found out that I should have read [the documentation of `is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) until the end: Safari does not support the attribute. But Safari is also the only browser on macOS at the moment to support the sharing API that I'm tinkering with. Although there's actually [a polyfill for custom elements](https://github.com/ungap/custom-elements) which seems to be pretty good, here's the dilemma:

-   I have an implementation of my web component that needs a lot of styling information. Check it out: [Native Sharing Web Component
    ](https://codepen.io/schneyra/pen/qBVWpBB). I don't feel to good with the idea to put the whole styling into a data attribute on the DOM.
-   And then there's the easier to style solution [CodePen Home
    Native Sharing Web Component with is-Attribute and Polyfill
    ](https://codepen.io/schneyra/pen/xxPxvow). The one which only works in the targeted browser when an additional 2 kB of JavaScript are applied. Which is in this particular case way to much.

At the moment I tend to use solution number two. The additional payload will be marginal when there are more web components in the sites sooner or later. But I have the feeling that I'm missing something. Maybe the internet can help?
