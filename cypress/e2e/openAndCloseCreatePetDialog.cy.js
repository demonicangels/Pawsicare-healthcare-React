describe('My pets page', () => {

  describe('user opens the Create new pet dialog', () => {

    before(() => {
      cy.visit('http://localhost:5173/login')

      cy.viewport(1920,1080) 
  
      cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
      cy.get('[data-testid="cypress-input-pass-login"]').type('123')
  
      cy.get('[data-testid="cypress-loginUser-form"]').submit()

      cy.wait(1000)

    })

    beforeEach(() => {
      cy.visit('http://localhost:5173/mypets')

      cy.get('[data-testid="cypress-openCreateDialog-openDialogBtn"]').click()
    })

    it('the diaalog is open', () => {
      cy.get('[data-testid="cypress-openCreateDialog-CreateDialog"]').should('be.visible')
    })

    after(() => {
      cy.get('[data-testid="cypress-openCreateDialog-closeDialogBtn"]').click()
      cy.get('[data-testid=cypress-loginUser-profileBtn]').click()
      cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
      cy.get('[data-testid="cypress-button-logout"]').click()
    })

  })

  describe('user closes the Create new pet dialog', () => {

    before(() => {
      cy.visit('http://localhost:5173/login')

      cy.viewport(1920,1080) 
  
      cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
      cy.get('[data-testid="cypress-input-pass-login"]').type('123')
  
      cy.get('[data-testid="cypress-loginUser-form"]').submit()

      cy.wait(1000)

    })

    beforeEach(() => {
      cy.visit('http://localhost:5173/mypets')

      cy.get('[data-testid="cypress-openCreateDialog-openDialogBtn"]').click()

      cy.visit('http://localhost:5173/mypets')
  
      cy.get('[data-testid="cypress-openCreateDialog-openDialogBtn"]').click()
      cy.get('[data-testid="cypress-openCreateDialog-closeDialogBtn"]').click()
    })

    it('closes the dialog', () => {
      cy.get('[data-testid="cypress-openCreateDialog-CreateDialog"]').should('not.exist')
    })

    after(() => {
      cy.get('[data-testid=cypress-loginUser-profileBtn]').click()
      cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
      cy.get('[data-testid="cypress-button-logout"]').click()
    })

  })

})