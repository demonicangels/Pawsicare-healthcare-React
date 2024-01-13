describe('a dialog with all fields needed to create a pet should open and close when the corresponding button is pressed', () => {
  it('opens and closes the dialog', () => {
    cy.visit('http://localhost:5173/login')

    cy.viewport(1920,1080) 

    cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
    cy.get('[data-testid="cypress-input-pass-login"]').type('123')

    cy.get('[data-testid="cypress-loginUser-form"]').submit()

    cy.wait(2000)

    cy.visit('http://localhost:5173/mypets')

    cy.get('[data-testid="cypress-openCreateDialog-openDialogBtn"]').click()

    cy.get('[data-testid="cypress-openCreateDialog-CreateDialog"]').should('be.visible')

    cy.get('[data-testid="cypress-openCreateDialog-closeDialogBtn"]').click()

    cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
    cy.get('[data-testid="cypress-button-logout"]').click()
  })

})