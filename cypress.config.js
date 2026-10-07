const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'pjrxiv',
  e2e: {
    baseUrl: 'https://eventhub.rahulshettyacademy.com',
    specPattern: 'cypress/tests/**/*.cy.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
