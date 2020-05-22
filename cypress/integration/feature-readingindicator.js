describe("Feature - Reading-Indicator", () => {
    beforeEach(() => {
        cy.visit("/articles/welcome-to-my-new-website/");
    });

    it("starts with 0%", () => {
        cy.contains("[data-cy-reading-indicator]", "0%");
    });

    it("ends with 100%", () => {
        cy.scrollTo("bottom");
        cy.contains("[data-cy-reading-indicator]", "100%");
    });
});
