

describe('User login page', () => {

  describe('user entering invalid credentials', () =>{

    beforeEach(() => {
      cy.visit('http://localhost:5173/login')
  
      cy.viewport(1920,1080) 
  
      cy.get('[data-testid="cypress-input-email-login"]').type('fake@gmail.com')
      cy.get('[data-testid="cypress-input-pass-login"]').type('ddz')
  
      cy.get('[data-testid="cypress-loginUser-form"]').submit()
  
    })

    it('error message in case of wrong credentials', () =>{

      cy.get('[data-testid="cypress-loginUser-invalidCredentials-error"]')
      .should('be.visible')
      .and('have.text', 'Wrong username or password. Please try again!');
  
    });

  })

  describe('user successfully logs in', () =>{
    
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')

      cy.viewport(1920,1080) 
  
      cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
      cy.get('[data-testid="cypress-input-pass-login"]').type('123')
  
      cy.get('[data-testid="cypress-loginUser-form"]').submit()
  
    })

    it('user is logged in', () => {
      cy.url().should('include', 'http://localhost:5173/doctors')
    });

    after(() => {
      cy.get('[data-testid=cypress-loginUser-profileBtn]').click()
      cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
      cy.get('[data-testid="cypress-button-logout"]').click()
    })

  })
})