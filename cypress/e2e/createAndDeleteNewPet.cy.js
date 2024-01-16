import '@testing-library/cypress/add-commands';

describe('user creates a new pet', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
      
    cy.viewport(1920,1080) 

    cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
    cy.get('[data-testid="cypress-input-pass-login"]').type('123')

    cy.get('[data-testid="cypress-loginUser-form"]').submit()

    cy.wait(2000)

    cy.visit('http://localhost:5173/mypets')

    cy.get('[data-testid="cypress-openCreateDialog-openDialogBtn"]').click()

    cy.get('[data-testid= "cypress-createNewPet-nameInput"]').type('Nia')

    cy.get('[data-testid="cypress-createNewPet-genderDropdown"]').click();
    cy.get('[data-value="Female"]').click();

    cy.get('[data-testid= "cypress-createNewPet-typeOfAnimalDropdown"]').click()
    cy.get('[data-value="Cat"]').click();

    cy.get('[data-testid= "cypress-createNewPet-descriptionInput"]').type('test')

    cy.get('[data-testid= "cypress-createNewPet-saveDialogBtn"]').click()

    cy.wait(2000);
  }) 

  it('a new pet is created and displayed', () => {
    cy.get('.pets-cards')
      .contains('Nia')
      .should('exist')

    cy.get('[data-testid="cypress-logout-sideNavButton"]').click()
    cy.get('[data-testid="cypress-button-logout"]').click()
  })
})

describe('user delete a chosen pet', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')
    
      cy.viewport(1920,1080) 
  
      cy.get('[data-testid="cypress-input-email-login"]').type('ari@gmail.com')
      cy.get('[data-testid="cypress-input-pass-login"]').type('123')
  
      cy.get('[data-testid="cypress-loginUser-form"]').submit()
  
      cy.wait(2000)
  
      cy.visit('http://localhost:5173/mypets')
  
      cy.get('.pets-cards').find('.petCardContent').should('have.length', 2);
  
      cy.get('.pets-cards')
      .contains('h4','Nia').parent(cy.get('[data-testId="cypress-createNewPet-petCardContent"]')).within(() =>{
        cy.get('[data-testid="cypress-createNewPet-deleteBtn"]').click();
  
      })
      cy.wait(2000);
    })

    it('deletes a chosen pet', () =>{
  
      cy.get('.pets-cards')
        .contains('Nia')
        .should('not.exist');
  
    })

})