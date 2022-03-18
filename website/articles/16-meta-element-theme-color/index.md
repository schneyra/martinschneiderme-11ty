---
title: "Meta Element: theme-color"
date: 2021-06-23
excerpt: "In the changelog I’m documenting modifications to this site that might be of interest, but are not necessarily my own ideas or work. This time it’s about a new tag that's supported in Safari."
tags:
    - changelog
---

With the <a href="https://developer.apple.com/safari/download/">latest developer preview of Safari</a> there's support for the meta element with the name <code><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color">theme-color</a></code>. While there was some support mostly on Android phones, it is now also possible to modify the color of the tab bar of Apples browser on macOS. The support for media queries seems to be new. So first I've added these two lines way up in the <code>head</code>-Element of my template to set the color to match the background color of my website.

```html
<meta
    name="theme-color"
    media="(prefers-color-scheme: light)"
    content="hsl(0, 0%, 95%)"
/>

<meta
    name="theme-color"
    media="(prefers-color-scheme: dark)"
    content="hsl(216, 25%, 12%)"
/>
```

Unfortunately, CSS custom properties are seemingly not (yet?) supported so the color is just changing when the color mode of the operating system is changing. It was fun to see this work, but I wasn't too happy since it would not always match the chosen color theme on my site.

But since the neccessary code is already in place, it's just a small change in two parts of the site. The correct color on the meta element needs to be set when a page is loading and when someone switches the color mode. Now I can change the color with my own JavaScript based switcher almost that easy. Here's the <a href="https://github.com/schneyra/martinschneiderme-11ty/commit/14adcf6143f1e300df43fc99acc43f7f362816b4">commit with these changes</a>.

{% figureElement 'website/articles/16-meta-element-theme-color/screenshot-martinschneiderme-safari.png', 'Two screenshots of my website with colored tab bars - one light and one dark.' %}

Im pretty happy with that solution for the moment, although I'm a bit concerned that I might forget to change the color in these two additional places when I'm fiddling around in the stylesheets next time. Maybe this is the right point to think about design tokens. I like this small detail and I'm curious if other browser vendors will provide something similar in the future. People have for example also used it to make notifications more obvious.

A lot of the new features of Safari in the upcoming release of macOS are shown in <a href="https://developer.apple.com/videos/play/wwdc2021/10029/">this video on apple.com</a>.
