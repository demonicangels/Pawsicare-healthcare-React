describe('User succesfully logs out', () => {
  it('user succesfully logsOut', () => {
    cy.visit('http://localhost:5173/login')

    cy.viewport(1920,1080) 

    cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
    cy.get('[data-testid="cypress-input-pass-login"]').type('123')

    cy.get('[data-testid="cypress-loginUser-form"]').submit()

    cy.wait(2000)

    cy.visit('http://localhost:5173/doctors')

    cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
    cy.get('[data-testid="cypress-button-logout"]').click()

    cy.window().then((win) => {
      const accessToken = win.sessionStorage.getItem("accessToken")
      expect(accessToken).to.be.null;
    })

    cy.url().should('include', 'http://localhost:5173/')
  })
})