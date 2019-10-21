context('Content and navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  describe('Home page', () => {
    it('Should have a list of projects with at least one project', () => {
      cy.get('.projects-list')
        .find('.projects-list__item')
        .its('length')
        .should('be.gte', 1);
    });

    it('It should go to project url detail on click list project item', () => {
      cy.get('.projects-list')
        .find('.projects-list__item a')
        .first()
        .invoke('attr', 'href')
        .then(href => {
          cy.get('.projects-list')
            .find('.projects-list__item a')
            .first()
            .click()
            .then(() => {
              cy.location()
                .then(location => expect(location.pathname).to.eq(href));
            });
        });
    });

    it('Should have a button to open the contact form', () => {
      cy.get('button.contact-form')
        .should('be.visible');
    });
  });
});
