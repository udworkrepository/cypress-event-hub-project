class EventsPage {
  visitEvents() {
    cy.visit('/events');
  }

  getEventPaths() {
    return cy.get('article a[href*="/events/"]', { timeout: 10000 }).then(($links) => {
      const paths = [...new Set([...$links].map((link) => new URL(link.href).pathname))];
      expect(paths, 'available event pages').not.to.be.empty;
      return paths;
    });
  }

  visitEvent(path) {
    cy.visit(path);
  }

  bookOneTicket({ fullName, email, phone }) {
    cy.get('input[placeholder="Your full name"]').clear().type(fullName);
    cy.get('input[placeholder="you@email.com"]').clear().type(email);
    cy.get('input[placeholder="+91 98765 43210"]').clear().type(phone);
    cy.contains('button', 'Confirm Booking').click();
  }
}

module.exports = EventsPage;
