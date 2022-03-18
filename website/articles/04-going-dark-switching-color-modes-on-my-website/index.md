---
title: "Going Dark: Switching Color Modes on My Website"
date: 2020-04-20
excerpt: "Many people prefer the so called dark mode of their operating system. My website now also comes with a dark version. It is automatically shown if you are in dark mode, but you can also toggle it by button."
---

A few years back, operating-system-manufacturers started implementing the so-called "dark modes" into their systems. Users can switch between a light or dark color-theme of the OS and the software supporting that feature. CSS gives us a `<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">prefers-color-scheme</a>` Media-Query which provides the selected mode for usage in our stylesheets. The people at Stack Overflow have written a detailed post about <a href="https://stackoverflow.blog/2020/03/31/building-dark-mode-on-stack-overflow/">their journey to the often requested dark mode</a>. Here is how I implemented it.

When developing my last placeholder-site on this domain, I've had implemented a dark version which changed some of the sites colors and even a picture. Here's a comparison of the two versions:

{% figureElement 'website/articles/04-going-dark-switching-color-modes-on-my-website/martinschneiderme-old.png', 'Side-by-side-comparison of light- and dark-mode my old website.' %}

This time I also wanted to give the user the opportunity to switch manually between the two color-themes. You've seen this on countless websites and you can try it right here by clicking on the icon-button right of the navigation.

## Preparing My CSS

The easiest way to change colors on a website is certainly via <em><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*">CSS custom properties</a></em>. Since I am by no means a designer, so I like to store all colors of my CSS in variables because I'm changing them back and forth all the time. While I only used SCSS-variables in the past, this time I've been using custom properties while developing this site from the beginning. So I didn't have to change much in the existing code: I mainly set a `@media (prefers-color-scheme: dark)` and began changing colors.

## Switching Modes With a Button

My first plan was to manually switch the color mode by setting a variable on the `body`-Element. So I started by adding a little file named <em>ColorModeToggle.svelte</em> to my repository and started coding. While I was discussing my plan with my frontend-friends they reminded me of the tutorial <em><a href="https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/">Create a user controlled dark or light mode</a></em> by Andy Bell. Luckily that covers everything I've thought of, so was able to follow it mostly.

The basic idea, as it is detailed described by Andy Bell, is to let the browser automatically switch to the preferred version of the site - but also let the user decide otherwise.

I've made some adjustments to the code from the tutorial so that I'm just saving a user-preference if it is not the given OS-default. Also, I'm tackling the edge case where a user might switch the color mode of the operating system while having explicitly set a color mode on the website. I might have been a little bit too obsessed about that little button when I got late that night. Here's my toggle-function in it's full glory. In retrospective, Andys code is surely way more understandable and more than sufficient.

```js
function toggleColorMode() {
    let currentColorMode = localStorage.getItem("colorMode");
    const osColorMode = helper.getCSSCustomProp("--os-color-mode");

    // Switches between "auto" and "opposite of 'auto'"
    switch (currentColorMode) {
        case null:
            if (osColorMode === "dark") {
                currentColorMode = "light";
                nextColorModeLabel = "auto";
            } else {
                currentColorMode = "dark";
                nextColorModeLabel = "light";
            }
            break;
        case "dark":
            if (osColorMode === "light") {
                currentColorMode = null;
                nextColorModeLabel = "dark";
            } else {
                currentColorMode = "light";
                nextColorModeLabel = "auto";
            }
            break;
        case "light":
            if (osColorMode === "dark") {
                currentColorMode = null;
                nextColorModeLabel = "light";
            } else {
                currentColorMode = "dark";
                nextColorModeLabel = "auto";
            }
            break;
    }

    if (currentColorMode) {
        // set the state on the &lt;html&gt;-element to toggle mode
        document.documentElement.setAttribute(
            "data-user-color-scheme",
            currentColorMode
        );

        // save the state for later visits
        localStorage.setItem("colorMode", currentColorMode);
    } else {
        // remove settings to fall back to OS-preference
        document.documentElement.removeAttribute("data-user-color-scheme");
        localStorage.removeItem("colorMode");
    }
}
```

I also went a slightly other way to show the suitable icon in my button and wrote some helper-classes named `.show-if-colormode-light` and `.show-if-colormode-dark` in my CSS. I prefer that solution over storing SVGs in a custom property and those classes might come in handy later in the project.

## Remembering the Selected Mode

I'm using localStorage to remember the visitors preference. While saving and getting the state is easy, I stumbled upon the problem that the pages flashed white when reloading the dark site. After fiddling around with various methods to set the data-attribute when loading the site initially, including the <a href="https://svelte.dev/docs#onMount">`onMount`-function of Svelte</a>, I've found the solution in swyx' blogpost with the suitable name <em><a href="https://www.swyx.io/writing/avoid-fotc/">Avoiding Flash of Unthemed Code</a></em>. Now I'm using the `&lt;svelte:head&gt;`-Tag to inject a `script`-tag with an <em>IIFE</em> into the head of my site. No flashes. Thanks.

## In conclusion...

Even if it is not the most useful feature of a website, implementing the dark mode was a lot of fun. I like the idea of manipulating the appearance of the site and even enjoyed the very late hours at the weekend trying to find the solution to that flash of unstyled content. Even though I don't have too much time lately, I really love trying out new things on this website and exploring the given posibilities. I also might like the dark version of the site even a bit more than the light one.
