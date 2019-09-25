describe('Home page content', () => {
  it('Should have a list of projects with at least one project', () => {
    cy.visit('http://localhost:8000');
    cy.get('.projects-list')
      .find('.projects-list__item')
      .its('length')
      .should('be.gte', 1);
  });
});
