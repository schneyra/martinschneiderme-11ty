const highlightCode = require("./highlightCode");

module.exports = (blogposts) => {
    return Promise.all(
        blogposts.map(async (post) => {
            // Remove HTML-Tags from Meta-Description
            let metaDescription = post.excerpt.rendered.replace(
                /(<([^>]+)>)/gi,
                "",
            );
            metaDescription = metaDescription.replace("\n", "");

            // Code-Highlighting with Prism
            let content = highlightCode(post.content.rendered);

            // Make relative URLs absolute (would work otherwise on the site, but not in the feed)
            content = content.replace(
                'href="/',
                'href="https://martinschneider.me/',
            );

            return await {
                title: post.title.rendered,
                date: post.date,
                formattedDate: new Date(post.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                rssDate: new Date(post.date).toUTCString(),
                modifiedDate: post.modified,
                slug: post.slug,
                metaDescription: metaDescription,
                excerpt: post.excerpt.rendered,
                content: content,
                categorySlugs: post.msme_categories_slugs,
            };
        }),
    );
};
