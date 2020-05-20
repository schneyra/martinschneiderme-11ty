describe("Page - Homepage", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("has the correct headline", () => {
        cy.contains("h1", "Hey, my name is Martin!");
    });

    it("navigates to /about", () => {
        cy.get("nav a").contains("about").click();
        cy.url().should("include", "/about");
        cy.contains("h1", "Hello, again!");
    });

    it("navigates to /articles", () => {
        cy.get("nav a").contains("articles").click();
        cy.url().should("include", "/articles");
        cy.contains("h1", "Articles");
    });
});
