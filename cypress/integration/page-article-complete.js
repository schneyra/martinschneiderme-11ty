describe("Page - Article 'Welcome to My New Website'", () => {
    const excerpt =
        "After years and years of just having some placeholder-site on that domain that I use for emails, I decided to build a classic homepage. My own little place on the internet, that is just about me. Welcome.";

    beforeEach(() => {
        cy.visit("/articles/welcome-to-my-new-website/");
    });

    it("has the correct title", () => {
        cy.title().should(
            "eq",
            "Welcome to My New Website › Martin Schneider — Frontend Developer",
        );
    });

    it("has the correct canonical", () => {
        cy.get('link[rel="canonical"]').should(
            "have.attr",
            "href",
            "https://martinschneider.me/articles/welcome-to-my-new-website/",
        );
    });

    it("has the correct description", () => {
        cy.get('meta[name="description"]').should(
            "have.attr",
            "content",
            excerpt,
        );
    });

    it("has the correct headline", () => {
        cy.contains("h1", "Welcome to My New Website");
    });

    it("has the correct date", () => {
        cy.contains("time", "Sunday, March 15, 2020");
    });

    it("has the correct excerpt", () => {
        cy.contains(".article__excerpt p", excerpt);
    });

    it("has a reactions-button", () => {
        cy.contains("[data-webmentionbutton]", "Reactions");
    });
});
