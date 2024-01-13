

describe('User login page', () => {

  it('error message in case of wrong credentials', () =>{
    cy.visit('http://localhost:5173/login')

    cy.viewport(1920,1080) 

    cy.get('[data-testid="cypress-input-email-login"]').type('fake@gmail.com')
    cy.get('[data-testid="cypress-input-pass-login"]').type('ddz')

    cy.get('[data-testid="cypress-loginUser-form"]').submit()

    cy.wait(2000)

    cy.get('[data-testid="cypress-loginUser-invalidCredentials-error"]')
    .should('be.visible')
    .and('have.text', 'Wrong username or password. Please try again!');

  });

  it('allows users to enter valid credentials and login', () => {
    cy.visit('http://localhost:5173/login')

    cy.viewport(1920,1080) 

    cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
    cy.get('[data-testid="cypress-input-pass-login"]').type('123')

    cy.get('[data-testid="cypress-loginUser-form"]').submit()

    cy.wait(2000)

    cy.url().should('include', 'http://localhost:5173/doctors')

    cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
    cy.get('[data-testid="cypress-button-logout"]').click()

  });

})