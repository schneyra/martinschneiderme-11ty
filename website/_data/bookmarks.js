const AssetCache = require("@11ty/eleventy-cache-assets");

/**
 * Get the bookmarks from Pinboard
 * Uses eleventy-cache-assets to speed up build time
 */
async function fetchBookmarks() {
    try {
        return AssetCache(
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

async function fetchTags() {
    try {
        return AssetCache(
            `https://api.pinboard.in/v1/tags/get?format=json&auth_token=${process.env.PINBOARD_API_TOKEN}`,
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
                id: bookmark.hash,
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

async function generateTagList(tags, bookmarks) {
    return await Promise.all(
        Object.keys(tags).map(async (tag) => {
            let foundBookmarks = [];

            await Promise.all(
                bookmarks.map((bookmark) => {
                    if (
                        bookmark.tags.find((bookmarkTag) => bookmarkTag === tag)
                    ) {
                        foundBookmarks.push(bookmark);
                    }

                    return bookmark;
                })
            );

            return { tag: tag, bookmarks: foundBookmarks };
        })
    );
}

module.exports = async () => {
    const bookmarksFromPinboard = await fetchBookmarks();
    const tagsFromPinboard = await fetchTags();
    const processedBookmarks = await processBookmarks(bookmarksFromPinboard);
    const bookmarksByTag = await generateTagList(
        tagsFromPinboard,
        processedBookmarks
    );

    return {
        bookmarks: processedBookmarks,
        tags: bookmarksByTag
    };
};
