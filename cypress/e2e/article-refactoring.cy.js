const articles = [
    {
        title: "Welcome to My New Website",
        slug: "welcome-to-my-new-website",
        humanDate: "Sunday, March 15, 2020"
    },
    {
        title: "Building a Website With Sapper, Svelte and WordPress",
        slug: "building-a-website-with-sapper-and-wordpress",
        humanDate: "Saturday, March 28, 2020"
    },
    {
        title: "Adding Webmentions to My Website",
        slug: "adding-webmentions-to-my-website",
        humanDate: "Monday, April 13, 2020"
    },
    {
        title: "Going Dark: Switching Color Modes on My Website",
        slug: "going-dark-switching-color-modes-on-my-website",
        humanDate: "Monday, April 20, 2020"
    },
    {
        title: "Creating a Sharing Button With the Web Share API",
        slug: "creating-a-sharing-button-with-the-web-share-api",
        humanDate: "Sunday, May 10, 2020"
    },
    {
        title: "Goodbye Sapper, hello Eleventy!",
        slug: "goodbye-sapper-hello-eleventy",
        humanDate: "Wednesday, May 13, 2020"
    },
    {
        title: "Testing My Eleventy-Website With Cypress and Netlify",
        slug: "testing-my-eleventy-website-with-cypress-and-netlify",
        humanDate: "Monday, May 25, 2020"
    },
    {
        title: "A Simple Blogroll for My Website",
        slug: "a-simple-blogroll-for-my-website",
        humanDate: "Saturday, June 6, 2020"
    },
    {
        title: "Firefox Is Shortening Long Attributes in It's Developer Tools",
        slug: "firefox-is-shortening-long-attributes-in-its-developer-tools",
        humanDate: "Monday, June 22, 2020"
    },
    {
        title: "Building a Blog With 11ty and WordPress",
        slug: "building-a-website-with-11ty-and-wordpress",
        humanDate: "Tuesday, August 4, 2020"
    },
    {
        title: "Goodbye 2020! 🥂 Hello 2021!",
        slug: "goodbye-2020-hello-2021",
        humanDate: "Thursday, December 31, 2020"
    },
    {
        title: "Using the Eleventy Image Plugin to Generate Images",
        slug: "using-the-eleventy-image-plugin-to-generate-images",
        humanDate: "Wednesday, March 3, 2021"
    },
    {
        title: "OG Images with the Eleventy Image Plugin",
        slug: "og-images-with-the-eleventy-image-plugin",
        humanDate: "Sunday, April 4, 2021"
    },
    {
        title: "Going Public",
        slug: "going-public",
        humanDate: "Monday, April 19, 2021"
    },
    {
        title: "Share what you know. Often.",
        slug: "share-what-you-know-often",
        humanDate: "Tuesday, May 18, 2021"
    },
    {
        title: "Meta Element: theme-color",
        slug: "meta-element-theme-color",
        humanDate: "Wednesday, June 23, 2021"
    },
    {
        title: "Building Charts With CSS",
        slug: "building-charts-with-css",
        humanDate: "Sunday, September 12, 2021"
    }
];

describe("Refactoring - Posts to Markdown", () => {
    beforeEach(() => {
        //cy.visit("/");
    });

    articles.forEach((article) => {
        it(`Article: '${article.title}'`, () => {
            cy.visit(`/articles/${article.slug}/`);

            cy.contains("h1", article.title);
            cy.title().should(
                "eq",
                `${article.title} › Martin Schneider — Frontend Developer`
            );
            cy.get('link[rel="canonical"]').should(
                "have.attr",
                "href",
                `https://martinschneider.me/articles/${article.slug}/`
            );
            cy.contains("time.dt-published", article.humanDate);
        });
    });
});
