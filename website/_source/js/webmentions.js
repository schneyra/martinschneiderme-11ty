(() => {
    function renderWebmentions(webmentions) {
        let html = `<h3>Reactions</h3>`;

        if (webmentions.length) {
            html += `<ol class="webmentions">`;

            webmentions.forEach((mention) => {
                const twitterString = mention.url.includes("twitter.com")
                    ? " on twitter"
                    : "";

                html += `<li class="webmentions__mention"><span class="webmentions__head">
            <img src="${mention.author.photo}" class="webmentions__avatar" loading="lazy" height="256" width="256" />
            <span>${mention.author.name} `;

                if (mention["wm-property"] === "like-of") {
                    html += `liked <a href="${mention.url}">this post</a>${twitterString}.</span></span>`;
                }

                if (
                    mention["wm-property"] === "in-reply-to" &&
                    mention.content
                ) {
                    html += `
                    replied to <a href="${mention.url}">this post</a>${twitterString}.</span></span>
                    <blockquote class="webmentions__quote">${mention.content.text}</blockquote>
                `;
                }

                if (mention["wm-property"] === "repost-of") {
                    console.log(mention);
                    html += `reposted <a href="${mention.url}">this post</a>${twitterString}.</span></span>`;
                }

                html += `</li>`;
            });

            html += `</ol>`;
        } else {
            html += "<p>No mentions yet. Be the first to share this post!</p>";
        }

        document.querySelector("[data-webmentionwrapper]").innerHTML = html;
    }

    async function getWebmentions(slug) {
        return new Promise((resolve, reject) => {
            fetch(
                `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=200&sort-dir=up&target=https://martinschneider.me/articles/${slug}/`,
            )
                .then((response) => response.json())
                .then((data) => resolve(data));
        });
    }

    async function webmentionButton() {
        const html = `<h3>Reactions</h3><p>Loading webmentions...</p>`;
        document.querySelector("[data-webmentionwrapper]").innerHTML = html;

        const slug = webmentionLoadButton.dataset.webmentionbutton;
        const webmentions = await getWebmentions(slug);
        webmentionLoadButton.removeEventListener("click", webmentionButton);

        renderWebmentions(webmentions.children);
    }

    const webmentionLoadButton = document.querySelector(
        "[data-webmentionbutton]",
    );

    if (webmentionLoadButton) {
        webmentionLoadButton.addEventListener("click", webmentionButton);
    }
})();
