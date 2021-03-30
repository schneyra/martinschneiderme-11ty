const AssetCache = require("@11ty/eleventy-cache-assets");

/**
 * Get the bookmarks from Pinboard
 * Uses eleventy-cache-assets to speed up build time
 */
async function fetchBookmarks() {
    try {
        return AssetCache(
            //`https://api.pinboard.in/v1/posts/recent?format=format&count=10&auth_token=${process.env.PINBOARD_API_TOKEN}`,
            `https://api.pinboard.in/v1/posts/all?format=json&auth_token=${process.env.PINBOARD_API_TOKEN}`,
            {
                duration: "10m",
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processBookmarks(bookmarks) {
    return Promise.all(
        bookmarks.map(async (bookmark) => {
            // Return only the data that is needed for the actual output
            return await {
                title: bookmark.description,
                date: bookmark.time,
                formattedDate: new Date(bookmark.time).toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                ),
                excerpt: bookmark.extended,
                href: bookmark.href,
                tags: bookmark.tags.split(" ").filter(Boolean)
            };
        })
    );
}

module.exports = async () => {
    /*let bookmarks = await fetchBookmarks();
    bookmarks = await processBookmarks(bookmarks);

    return bookmarks;*/

    return [];
};
