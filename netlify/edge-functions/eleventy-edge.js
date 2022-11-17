import {
    EleventyEdge,
    precompiledAppData
} from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
    try {
        let edge = new EleventyEdge("edge", {
            request,
            context,
            precompiled: precompiledAppData,

            // default is [], add more keys to opt-in e.g. ["appearance", "username"]
            cookies: []
        });

        let slug = edge.url.pathname;

        const webmentionsResponse = await fetch(`https://webmention.io/api/mentions.jf2?domain=martinschneider.me&per-page=200&sort-dir=up&target=https://martinschneider.me${slug}`);
        const webmentions = await webmentionsResponse.json();

        edge.config((eleventyConfig) => {
            eleventyConfig.addGlobalData('webmentions', webmentions)
        });

        return await edge.handleResponse();
    } catch (e) {
        console.log("ERROR", { e });
        return context.next(e);
    }
};
