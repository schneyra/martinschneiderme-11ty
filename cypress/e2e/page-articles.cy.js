describe("Page - Articles", () => {
    beforeEach(() => {
        cy.visit("/articles");
    });

    it("/articles has a list of articles", () => {
        cy.get("[data-cy=articleListArticle]").its("length").should("be.gt", 0);
    });
});
