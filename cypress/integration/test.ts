describe('My First Test', () => {

  before(() => {
    cy.task('db:seed')
  })

  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('input[name=email]').type("sean.maxwell@gmail.com")
    cy.get('input[name=password]').type("Password@1")
    cy.contains('Login').click()
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/restricted`)
    cy.get('[data-cy=logout]').click();
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`)
    cy.visit('/restricted')
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`)
  })
});