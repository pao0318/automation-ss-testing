describe('My First Test', () => {

    it('test1', () => {
        cy.visit("http://localhost:3000/orders/")
        cy.get('.MuiButton-label').should("eq","FILTER");
    })
});