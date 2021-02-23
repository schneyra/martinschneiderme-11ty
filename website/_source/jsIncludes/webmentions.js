(() => {
    function renderWebmentions(webmentions) {
        let html = "";

        if (webmentions.length) {
            // update the label since it's normally written at build-time
            const label = webmentions.length === 1 ? "Reaction" : "Reactions";
            let labelHtml = `<h2>${webmentions.length} ${label}</h2>`;
            document.querySelector(
                "[data-js-webmention-label]"
            ).innerHTML = labelHtml;

            // now we're generating the actual list
            html += `<ol class="webmentions">`;

            webmentions.forEach((mention) => {
                const twitterString = mention.url.includes("twitter.com")
                    ? " on twitter"
                    : "";

                html += `<li class="webmentions__mention"><span class="webmentions__head">`;

                if (mention.author.photo) {
                    html += `<img src="${mention.author.photo}" class="webmentions__avatar" loading="lazy" height="256" width="256" />`;
                }

                html += `<span>${
                    mention.author.name
                        ? mention.author.name
                        : "<em>Someone</em>"
                } `;

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
                    html += `reposted <a href="${mention.url}">this post</a>${twitterString}.</span></span>`;
                }

                if (mention["wm-property"] === "mention-of") {
                    html += `mentioned the article in <a href="${mention.url}">this post</a>${twitterString}.</span></span>`;
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
                `https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=200&sort-dir=up&target=https://martinschneider.me/articles/${slug}/`
            )
                .then((response) => response.json())
                .then((data) => resolve(data));
        });
    }

    async function webmentionButton() {
        const slug = webmentionLoadButton.dataset.webmentionbutton;

        const webmentions = await getWebmentions(slug);
        webmentionLoadButton.removeEventListener("click", webmentionButton);

        renderWebmentions(webmentions.children);
    }

    const webmentionLoadButton = document.querySelector(
        "[data-webmentionbutton]"
    );

    if (webmentionLoadButton) {
        webmentionLoadButton.addEventListener("click", webmentionButton);
    }
})();
