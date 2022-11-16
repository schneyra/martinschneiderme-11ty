---
title: "Multi-Line Padded Text and box-decoration-break"
date: 2022-11-16
excerpt: "Sometimes I get really happy when modern CSS solves a problem I've been fiddling around with for a long time."
---

From time to time over the last years, I've had to build a headline element that is supposed to have a padded colored
background. Designers love that and it's actually easy to solve, as long as the text is short enough to fit in one line.
Just set a `background-color` and you're fine. Sadly, most of the time this is not the case. So it got ugly sometimes.

As usual there's an [article on CSS-Tricks on that case](https://css-tricks.com/multi-line-padded-text/)
well documenting many possible solutions. As I read the article I got sadder and sadder because the solutions were way
more complicated as I like them to be. So I was very relieved when I ended up reading the last section about
`box-decoration-break` which is [here documented on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break).

Since it's 2022, why not give it a try? In the end it was just this little bit of CSS and it works fine in all major
browsers:

```css
.is-style-background {
    background: $color-darkgrey;
    color: $color-white;
    padding: 0 12px;
    display: inline;
    box-decoration-break: clone;
}
```

For this clients website we're using PT Sans which renders fine in the boxes and gives us a little space between the
lines. Other fonts might need some tweaking with `line-height` and `padding` to make it look good.
