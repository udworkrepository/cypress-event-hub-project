const EventHubPage = require('../pageObjects/EventHubPage');

function generateRandomUserData() {
  const uniqueId = Date.now();
  const email = `qa.user.${uniqueId}@example.com`;
  const password = `Password${uniqueId}!`;

  return {
    email,
    password,
  };
}

describe('EventHub Registration Test Suite', () => {
  let userData;

  before(() => {
    userData = generateRandomUserData();
    console.log('================================================');
    console.log('✅ BDD SETUP: Generated User Data');
    console.log(`   Email: ${userData.email}`);
    console.log(`   Password: ${userData.password}`);
    console.log('================================================');
  });

  it('should successfully register a new user with valid credentials', () => {
    const page = new EventHubPage();

    page.navigate();
    page.fillForm(userData.email, userData.password, userData.password);
    page.submit();

    cy.location('pathname').should('eq', '/');
    cy.get('h1').should('contain.text', 'Amazing Events');
    cy.log('✅ TEST PASSED: Registration simulated successfully.');
  });
});

