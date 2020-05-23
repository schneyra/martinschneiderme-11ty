describe("Feature - Colormode-Toggle", () => {
    it("switches to dark mode", () => {
        cy.visit("/");
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("[data-user-color-scheme]").its("value").should("be", "dark");
    });

    it("switches to dark and back to light mode", () => {
        cy.visit("/");
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("html").should("have.attr", "data-user-color-scheme", "dark");
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("html").should("not.have.attr", "data-user-color-scheme");
    });
});
