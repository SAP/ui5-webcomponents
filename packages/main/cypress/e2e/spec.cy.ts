  describe('Accessibility Testing', () => {
    before(() => {
        // Visit the page you want to test
        cy.visit('http://localhost:8080/packages/main/test/pages/Button.html'); // Replace with your application's URL
        
        // Inject axe-core into the page
        cy.injectAxe();
    });
    
    it('Should check the entire page for accessibility issues', () => {
        // Perform an action that changes the DOM, e.g., click a button
        // cy.get('button').click(); 

        // Check for accessibility violations on the current page state
        cy.checkA11y();
    });
});