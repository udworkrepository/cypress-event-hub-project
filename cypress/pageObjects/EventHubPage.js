
class EventHubPage {
  constructor(baseUrl = 'https://eventhub.rahulshettyacademy.com') {
    this.baseUrl = baseUrl;
  }

  navigate(path = '/register') {
    cy.visit(`${this.baseUrl}${path}`);
  }

  fillForm(email, password, confirmPassword) {
    cy.get('input[placeholder="you@email.com"]').clear().type(email);
    cy.get('input[placeholder="Min 8 chars, uppercase, number & symbol"]').clear().type(password);
    cy.get('input[placeholder="Repeat your password"]').clear().type(confirmPassword);
  }

  submit() {
    cy.contains('button', 'Create Account').click();
  }
}

module.exports = EventHubPage;

