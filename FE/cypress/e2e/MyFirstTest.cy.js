describe('Screenshot', () => {
    beforeEach(() => cy.visit('http://localhost:3000/orders/'));

    it('should take a screenshot of a specific component', () => {
        cy.viewport(1920, 1080)
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root').should('be.visible');
        cy.get('.MuiGrid-container > :nth-child(2) > .MuiPaper-root').should('be.visible');
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root').first().screenshot({ padding:10})
    });
});
