const EventHubPage = require('../pageObjects/EventHubPage');

function generateTestUserData() {
  const uniqueId = `${Date.now()}${Cypress._.random(100, 999)}`;

  return {
    email: `qa.user.${uniqueId}@example.com`,
    password: `Password${uniqueId}!`,
  };
}

function registerTestUser(userData) {
  const page = new EventHubPage();

  page.navigate('/register');
  page.fillForm(userData.email, userData.password, userData.password);
  page.submit();
  return cy.location('pathname').should('eq', '/');
}

module.exports = { generateTestUserData, registerTestUser };
