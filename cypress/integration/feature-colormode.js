describe("Feature - Colormode-Toggle", () => {
    it("switches to dark mode", () => {
        cy.visit("/");
        cy.get("[data-cy=colorModeToggleButton]").click();
        cy.get("[data-user-color-scheme]").its("value").should("be", "dark");
    });
});
