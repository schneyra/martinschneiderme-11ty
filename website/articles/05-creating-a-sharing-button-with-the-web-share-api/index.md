---
title: "Creating a Sharing Button With the Web Share API"
date: 2020-05-10
excerpt: "One of the great features of the modern internet is the ability to easily  share content. I'm sharing a lot of links to content of all kind every day. Most of the time I simply copy URLs from the browser and paste them somewhere. But wouldn't it be neat to have a simpler solution?"
---

Have you ever used one of those sharing-buttons on a website? I can't really remember, except for testing purposes when I had to implement them into a clients website. I'm actually not a big fan of those colorful, sometimes user-tracking and JavaScript-heavy bars with links to all kinds of social networks that the users <em>might</em> use. So this week I've implemented some sharing-functionality into this site. Sounds weird? Read on!

Some days ago a tweet by Addi Osmani send me to the article <a href="https://web.dev/web-share/"><em>Share like a native app with the Web Share API</em></a>. The article describes the possibility to trigger the sharing-dialog of the operating system which users can organize to their own needs. While I immediately loved the idea of having a simple and native sharing solution in my site, a look at the <a href="https://caniuse.com/#feat=web-share">"Can I use"-page for Web Share API</a> was a bit demotivating. Time for some progressive enhancement!

Things don't get too complicated here. First, I added a hidden button with <a href="https://feathericons.com/?query=share">two different sharing icons</a> to my markup:

```html
<button type="button" data-js-sharing-button class="is-hidden" aria-hidden="true">
    <svg data-js-sharing-icon-android class="is-hidden" aria-hidden="true" focusable="false" ...></svg>
    <svg data-js-sharing-icon-ios class="is-hidden" aria-hidden="true" focusable="false"...></svg>
    <span>Share this post<span>
</button>
```

The API is yet just supported within Safari both on Mac- and iOS and in Chrome on Android. Both worlds use different default-icons for their native sharing-dialogues, so there's a little switch in my code that shows the icon that the user knows and understands. You'll see that in a minute.

Now, time for some JavaScript! As you can see it's pretty straight forward. The first half of the code is just finding out which icon to show. In the second half the actual button is made visible and an event-listener is added. I'm using the canonical-link which is in every blogposts head for sharing.

```js
(() => {
    if (navigator.share) {
        // Android uses a different icon for sharing buttons
        // from devices in Apples ecosystem
        // Thanks to: https://davidwalsh.name/detect-android
        const ua = navigator.userAgent.toLowerCase();
        const isAndroid = ua.indexOf("android") > -1;
        const sharingIconSelector = isAndroid
            ? "[data-js-sharing-icon-android]"
            : "[data-js-sharing-icon-ios]";
        const sharingIcon = document.querySelector(sharingIconSelector);
        sharingIcon.classList.remove("is-hidden");

        const sharingButton = document.querySelector(
            "[data-js-sharing-button]"
        );

        sharingButton.classList.remove("is-hidden");
        sharingButton.removeAttribute("aria-hidden");

        sharingButton.addEventListener("click", () => {
            let url = document.location.href;

            const canonicalElement = document.querySelector(
                "link[rel=canonical]"
            );

            if (canonicalElement !== null) {
                url = canonicalElement.href;
            }

            navigator
                .share({ url: url })
                .then(() => console.log("Sharing successful"))
                .catch((error) => console.log("Error while sharing", error));
        });
    }
})();
```

I already had the CSS for buttons with icons, so there was not much more work left. I thought some time about writing the markup with JavaScript instead of hiding it initially but since I am inlining all the code there's no real benefit.

![Picture of the new Sharing Button beneath the content.](/articles/05-creating-a-sharing-button-with-the-web-share-api/sharing-button.jpeg)

That was a fun evening-project, although I don't think that it will survive really long. The functionality might be useful in a list of items that you would like to share separately or when you're building a web-based application. There's no real need for the button in an browser-environment. For example the sharing-button in Safari will be right beside my own one on an iOS device.

But why don't you try the button as long as it's in the site?
