describe("Page - Homepage", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("has the correct headline", () => {
        cy.contains("h1", "Hey, my name is Martin!");
    });

    it("navigates to /articles", () => {
        cy.get("nav a").contains("articles").click();
        cy.url().should("include", "/articles");
        cy.contains("h1", "Articles");
    });

    it("navigates to /blogroll", () => {
        cy.get("nav a").contains("blogroll").click();
        cy.url().should("include", "/blogroll");
        cy.contains("h1", "Blogroll");
    });
});
