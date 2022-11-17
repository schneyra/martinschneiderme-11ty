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

        edge.config((eleventyConfig) => {
            // Run some more Edge-specific configuration
            // e.g. Add a sample filter
            eleventyConfig.addFilter("json", (obj) =>
                JSON.stringify(obj, null, 2)
            );
        });

        return await edge.handleResponse();
    } catch (e) {
        console.log("ERROR", { e });
        return context.next(e);
    }
};
