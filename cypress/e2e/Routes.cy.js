describe('E2E Test', () => {
    it('should navigate to a specific route', () => {
        // Visit the root URL where your Vue application is hosted
        cy.visit('http://localhost:5173')

        // Wait for the element with ID "app" to be present
        cy.get('#app').should('exist')

        // Check if elmenet 'nav' exists
        cy.get('nav').should('exist')

        // Find input element and type in "Mosina"
        cy.get('input').type('Mosina')

        // Check if element with text "Mosina" appears below input
        cy.contains('Mosina').should('exist')

        // Click on the first element containing Mosina below input
        cy.contains('Mosina').click()

        // Check if the website redirects to the correct route
        cy.url().should('include', '/Mosina')

        // Check if there is an "i" element, the element should have a class of "fa-plus" in the navbar to add the city to favorites
        cy.get('i').should('have.class', 'fa-plus')

        // Pick i with fa-plus class and click on it
        cy.get('i.fa-plus').click()

        // Check if city "Mosina" was added to local storage as "savedCities"
        cy.window().its('localStorage.savedCities').should('include', 'Mosina')

    })
})
