# EventHub Cypress Automation Suite

This repository contains Cypress end-to-end tests for the EventHub practice site at https://eventhub.rahulshettyacademy.com.

## What this project does
- Registers a unique test account and verifies the app returns to the home page.
- Submits a one-ticket booking for every event currently listed.
- Checks that unique HTTP links found on the home and events pages respond successfully.

The booking test intercepts the booking API request and returns a simulated confirmation. This exercises the event booking UI without reserving real seats or creating live bookings.

## Prerequisites
Before using the repo, make sure you have:
- Node.js 20+ (compatible with the installed Cypress version)
- npm
- A browser available for Cypress (Electron is included by default)

## Clone and setup
```bash
git clone <your-repo-url>
cd cypress-eventhub-project
npm install
```

Replace `<your-repo-url>` with the repository's clone URL.

## Run the test suite
Run all tests in headless mode:
```bash
npm test
```

Open Cypress to watch the tests in the interactive runner:
```bash
npm run test:open
```

In the runner, choose **E2E Testing**, select a browser, then click a spec such as `event-booking.cy.js` or `links.cy.js`.

You can run a single spec headlessly with:
```bash
npx cypress run --spec cypress/tests/event-booking.cy.js
```

## Project structure
```text
cypress-eventhub-project/
├── cypress/
│   ├── pageObjects/
│   │   ├── EventHubPage.js
│   │   └── EventsPage.js
│   ├── tests/
│   │   ├── registration.cy.js
│   │   ├── event-booking.cy.js
│   │   └── links.cy.js
│   └── support/
│       └── testUser.js
├── .gitignore
├── cypress.config.js
├── package.json
├── README.md
└── package-lock.json
```

## Notes for users
- The test generates a unique email each run to avoid duplicate registration issues.
- The password follows the EventHub validation rules for a valid registration attempt.
- If the website changes its selectors or page structure, update the selectors in the page object file before rerunning the tests.
- The link test checks HTTP(S) URLs on the home and events listing pages, including event detail links.
- Booking and link tests create a fresh test account so they can access authenticated pages.

## Troubleshooting
If the test does not run:
1. Verify Node.js and npm are installed.
2. Run `npm install` again.
3. Confirm the project root contains `cypress.config.js` and `cypress/tests/registration.cy.js`.
4. If Cypress cannot launch, try updating Cypress with:
   ```bash
   npm install cypress@latest --save-dev
   ```
