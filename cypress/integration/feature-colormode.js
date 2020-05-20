describe("Feature - Colormode-Toggle", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("switches to dark mode", () => {
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("[data-user-color-scheme]").its("value").should("be", "dark");
    });

    it("switches to light mode", () => {
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("html").should("have.attr", "data-user-color-scheme", "dark");
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("html").should("not.have.attr", "data-user-color-scheme");
    });
});
