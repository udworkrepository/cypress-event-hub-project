const EventsPage = require('../pageObjects/EventsPage');
const { generateTestUserData, registerTestUser } = require('../support/testUser');

describe('Event ticket booking', () => {
  before(() => {
    registerTestUser(generateTestUserData());
  });

  it('submits a one-ticket booking for every event currently listed', () => {
    const eventsPage = new EventsPage();

    cy.intercept('POST', '**/api/**', (request) => {
      request.alias = 'bookingRequest';
      request.reply({
        statusCode: 201,
        body: {
          success: true,
          message: 'Booking confirmed',
          booking: {
            id: 'cypress-test-booking',
            ...request.body,
            totalAmount: request.body.totalAmount || 300,
          },
        },
      });
    });

    eventsPage.visitEvents();
    eventsPage.getEventPaths().each((eventPath) => {
      const eventId = eventPath.split('/').pop();

      eventsPage.visitEvent(eventPath);
      cy.get('h1').should('be.visible');
      eventsPage.bookOneTicket({
        fullName: 'Cypress Test User',
        email: `cypress.${eventId}@example.com`,
        phone: '+919876543210',
      });

      cy.wait('@bookingRequest').then(({ request, response }) => {
        expect(request.url.toLowerCase()).to.include('booking');
        expect(JSON.stringify(request.body)).to.include(eventId);
        expect(request.body).to.include({
          customerName: 'Cypress Test User',
          customerEmail: `cypress.${eventId}@example.com`,
          customerPhone: '+919876543210',
        });
        expect(response.statusCode).to.equal(201);
      });
      cy.contains('button', 'View My Bookings').should('be.visible');
    });
  });
});
