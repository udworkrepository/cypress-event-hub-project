function collectHttpLinks(links) {
  cy.get('a[href]').each(($link) => {
    const href = $link.prop('href');
    if (href && /^https?:\/\//i.test(href)) {
      links.add(href);
    }
  });
}

const { generateTestUserData, registerTestUser } = require('../support/testUser');

describe('Site links', () => {
  before(() => {
    registerTestUser(generateTestUserData());
  });

  it('checks every unique HTTP link on the home and events pages', () => {
    const links = new Set();

    cy.visit('/');
    collectHttpLinks(links);

    cy.visit('/events');
    cy.get('article', { timeout: 10000 }).should('have.length.greaterThan', 0);
    collectHttpLinks(links);

    cy.then(() => {
      expect(links.size, 'links discovered on the pages').to.be.greaterThan(0);

      cy.wrap([...links]).each((href) => {
        cy.request({
          url: href,
          failOnStatusCode: false,
          followRedirect: true,
        }).then((response) => {
          expect(response.status, `HTTP response for ${href}`).to.be.within(200, 399);
        });
      });
    });
  });
});
