---
title: "Firefox Is Shortening Long Attributes in It's Developer Tools"
date: 2020-06-22
excerpt: 'After using Firefox as my main browser for a while, I''ve recently started to use Firefox Developer Edition for developing websites. I am really happy with the developer tools. Especially the highlighting of CSS-grids is really useful. <em>Today I learned</em> about a "feature" that I really don''t like.'
tags:
    - til
---

I noticed that behavior while refactoring a blog template and it took me some time to find out that there's no problem with the API that's delivering the content for the blog. The picture tag is perfectly fine - Firefox is just cutting off the middle of the `srcset` attribute.

{% imageForArticles 'website/articles/09-firefox-is-shortening-long-attributes-in-its-developer-tools/screenshot-shortened-sourceset2.jpeg', 'Screenshot of the shortened srcset attribute.' %}

I actually forgot about that after I first noticed it a few weeks ago. So I had the second scare this weekend and decided to write it down. The browser does that with other attributes as well. Here's a test with some random words in a `class` attribute:

{% imageForArticles 'website/articles/09-firefox-is-shortening-long-attributes-in-its-developer-tools/screenshot-shortened-class-1.jpeg', 'Screenshot of the shortened class attribute.' %}

I didn't find an option to disable the shortening of the attributes. While I understand that those large blocks of code can be distracting I'd really like to switch that "feature" off and see the complete code while debugging. Ideas, anyone?

<strong>Update:</strong> <a href="https://marcgoertz.de/2020/lange-attributwerte-in-den-firefox-devtools">Marc</a> read the article and had the solution. There's a checkbox "<em>Truncate DOM attributes</em>" or "<em>DOM-Attribute kürzen</em>" in my case that I did not notice. Thanks, Marc! You should really head over to his article because he's also explaning how to configure that feature.
