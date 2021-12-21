---
title: "A Simple Blogroll for My Website"
layout: article
date: 2020-06-06
excerpt: "Back in the days almost every blog had a blogroll: A simple list of other websites that the owner likes or recommends. I've already seen some on other sites in the past weeks - maybe it's time to bring that tradition back."
---

The idea came to me when I cleared out my feed reader some weeks ago. With my growing interest in the Indieweb and discovering more and more interesting blogs, it was time be a bit sad about the shutdown of <a href="https://www.google.com/reader/about/">Google Reader</a> again and to start over again. So I cleaned up my <a href="https://feedly.com/">Feedly</a> account where I manage RSS feeds today.

<em>"Why not publish a list of the pages I have subscribed to?"</em> Linking and recommending other peoples content is one of the pillars of the modern web. A blogroll with familiar links to other pages also helps me to identify like minded people.

Today I deployed the first version of <a href="/blogroll/">my blogroll</a>. It is simply an alphabetically ordered list of pages. They are for now grouped by "Personal blogs", "Developers and Designers", "Magazines and Topics" and "Newsletters". While the first two groups contain links to pages of individual persons, the sites within the last two groups publish or recommend mostly the content of other people and are quite a good source for interesting content.

## Converting OPML

The blogroll is generated from an OPML file that I exported from <a href="https://reederapp.com/">Reeder</a>, which is the client I use for reading the RSS feeds in my Feedly account. The file is checked into the repository of this site and provides the data for the blogroll in the build process. I'm just going to update that file from time to time. There are definitely sites missing in my list. Feel free to send me some links!

Since OPML is an XML based format I was able to convert it to JSON with <a href="https://github.com/Leonidas-from-XIV/node-xml2js">node-xml2js</a>. Here is the complete script that I've placed in the `data` folder of Eleventy. The related template is quite simple: Just two nested for-loops that print the groups and the containing feeds.

```js
const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;

/**
 * Converts fs.readfile to a promised version
 * @see https://stackoverflow.com/a/46867579
 */
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function subscriptions() {
    const filePath = path.join(__dirname, "../blogroll/subscriptions.opml");

    let subscriptions;

    await readFile(filePath, { encoding: "utf-8" })
        .then((xml) => {
            parseString(xml, (err, json) => {
                if (!err) {
                    subscriptions = json.opml.body[0].outline;
                } else {
                    console.error("Error converting XML to JSON.");
                }
            });
        })
        .catch(() => console.error("Error loading file."));

    return subscriptions;
}

module.exports = subscriptions;
```

## Am I happy?

The current state of the site is definitely "MVP", the minimal viable product. It is a good start but I have some improvements planned: Maybe a short description of every site? And should I display the websites favicon to make the list less boring? The list also lacks pages that don't provide an RSS feed. Sadly this outstanding feature of the web is not used by many people any more. I'm not sure if this is a long term solution. But it is a good start.

Does your website provide an RSS feed? And when are you showing us your blogroll? If you already have one or find one on the internet, feel free to send me a link. I'll happily start a little list of other peoples blogrolls under this post.

## Blogroll

-   [Jan-Lukas Else](https://jlelse.blog/blogroll/)
-   [Max Böck](https://mxb.dev/blogroll/)
-   [Stefan Judis](https://www.stefanjudis.com/blogroll/)
