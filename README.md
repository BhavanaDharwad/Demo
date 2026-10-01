# Shop demo — Cypress suite

# Cypress E-commerce Test Suite

## Overview

This project contains an exploratory Cypress test suite for the Polymer Shop demo e-commerce application:

`https://shop.polymer-project.org/`

The exercise was intentionally time-boxed, so I focused on a small number of high-value customer journeys rather than attempting broad functional coverage.

My approach was based on:

- Business impact
- Customer impact
- Likelihood of failure
- Value of automation
- Reliability of the tests when executed repeatedly or in CI

The suite is written in **Cypress with TypeScript** and is designed to run both interactively during development and headlessly using `cypress run`.

---

## Prioritised User Journeys

Given the limited time available, I prioritised the following journeys.

### P0 — Product Selection and Add to Cart

This journey validates that a customer can:

1. Browse to a product category
2. Select a product
3. Select product options such as size and quantity
4. Add the product to the cart
5. Verify the product and price information in the cart

### Why I prioritised it

This is the beginning of the main purchase funnel.

If customers cannot successfully select products and add them to their cart, they cannot progress towards checkout and the business cannot generate revenue.

---

### P0 — Checkout and Payment Validation

This journey validates:

- Cart information before checkout
- Customer information entry
- Shipping information
- Payment information
- Successful checkout
- Validation of invalid payment information

### Why I prioritised it

Checkout is one of the highest-risk areas of an e-commerce application.

Failures here have a direct business impact because customers may complete most of the purchase journey but still be prevented from placing an order.

Payment validation was also included because incorrect or expired payment information should be rejected before an order can be successfully completed.

---

### P1 — Catalogue Service Failure and Recovery

This journey validates the application's behaviour when the catalogue request fails and the user retries the request.

The test:

1. Forces the catalogue request to fail
2. Verifies that an appropriate failure state is displayed
3. Stubs the retry request with a controlled successful response
4. Verifies that the catalogue recovers successfully

### Why I prioritised it

The purchase journey depends on backend services being available.

Testing a service failure adds coverage beyond the standard happy path and verifies that the user receives meaningful feedback when a dependency is unavailable.

It also demonstrates Cypress network interception and controlled failure-state testing.

---

# Project Structure

```text
cypress/
├── e2e/
│   ├── shopping.cy.ts
│   ├── checkout.cy.ts
│   └── CatalogueService.cy.ts
│
├── fixtures/
│   └── test data
│
├── support/
│   ├── commands.ts
│   ├── e2e.ts
│   └── pages/
│       ├── cart-page.ts
│       ├── checkout-page.ts
│       ├── home-page.ts
│       ├── item-detail-page.ts
│       └── list-page.ts
│
└── tsconfig.json

cypress.config.ts
package.json
package-lock.json
README.md
```

---

# Prerequisites

The project requires:

- Node.js 22.x, 24.x, or >=26.x
- npm
- Google Chrome

---

# Installation

Clone or download the repository and install the dependencies:

```bash
npm ci
```

`npm ci` is preferred because the project includes a `package-lock.json` and this provides a reproducible dependency installation, which is particularly useful in CI environments.

For normal local development, `npm install` can also be used.

---

# Running the Tests

## Headless / CI-style execution

Run the complete test suite using:

```bash
npm run cy:run
```

This executes Cypress using `cypress run`, making the suite suitable for execution within a CI environment.

A GitHub Actions pipeline is intentionally not required for this exercise; the project has instead been structured so the test command can be called from any CI platform.

---

## Interactive Cypress Runner

For development or debugging:

```bash
npx cypress open
```

This launches the Cypress Test Runner and allows individual specifications to be executed interactively.

---

# Selector Strategy

The Polymer Shop application makes extensive use of **Web Components and Shadow DOM**, which influenced the selector strategy used in this project.

Cypress is configured with:

```typescript
includeShadowDom: true
```

This allows Cypress commands to query elements contained inside open Shadow DOM trees.

Where possible, selectors were chosen in the following order:

1. Stable IDs
2. Semantic attributes such as `aria-label`
3. Component-scoped selectors
4. Visible text where it represents stable user-facing behaviour

For example:

```typescript
cy.get('shop-detail')
  .find('button[aria-label="Add this item to cart"]');
```

I avoided selectors based heavily on DOM position or styling, such as:

```typescript
cy.get('button').eq(2);
```

because these are more likely to break when the application's layout changes.

### Preferred approach in a production application

Because this is an external demo application, I cannot modify the application source.

If I owned the application, I would work with developers to introduce stable automation attributes such as:

```html
data-cy="add-to-cart"
```

or:

```html
data-testid="add-to-cart"
```

This would further reduce coupling between the tests and the application's presentation layer.

---

# Custom Cypress Commands

Reusable customer actions are implemented using Cypress custom commands.

For example:

```typescript
cy.addProductToCart({
  category: product.category,
  product: product.name,
  size: product.size,
  quantity: product.quantity
});
```

and the checkout form can be populated through a reusable command.

I chose custom commands for repeated workflows rather than duplicating the same interaction steps across multiple tests.

Page objects are intentionally kept lightweight and are primarily used to encapsulate selectors rather than placing large amounts of test logic inside page classes.

---

# Network Interception and Stubbing

One requirement of the exercise was to include a test that intercepts or stubs a network call.

I chose the catalogue-service resilience scenario for this because a genuine backend outage is difficult to trigger reliably against a public demo environment.

The first catalogue request is intercepted and forced to fail:

```typescript
cy.intercept('GET', catalogueUrl, {
  forceNetworkError: true
}).as('catalogueFailed');
```

The retry request is then replaced with a controlled successful response:

```typescript
cy.intercept('GET', catalogueUrl, {
  statusCode: 200,
  body: [CATALOGUE_PRODUCT]
}).as('catalogueRecovered');
```

This allows the test to deterministically verify both:

- How the application behaves when the service fails
- How the application behaves when the service becomes available again

### Why I did not stub the core shopping and checkout flows

The primary product and checkout journeys intentionally interact with the deployed application rather than replacing all backend behaviour with mocks.

For those scenarios, the value of the test is validating that the major parts of the deployed system work together.

I therefore used stubbing selectively for a failure condition that would otherwise be difficult to reproduce reliably.

---

# Test Isolation

Each Cypress test is designed so that it can execute independently.

Tests do not depend on state created by previous tests.

Required state such as adding a product to the cart is recreated during test setup where necessary.

This makes failures easier to diagnose and makes the suite more reliable when tests are reordered or executed independently.

---

# Assumptions and Trade-offs

## Public demo environment

The tests run against a public demonstration website.

This means I do not control:

- Application availability
- Test data
- Backend services
- Deployment changes
- Network latency

A production automation suite would normally execute against a controlled test environment.

---

## Scope versus coverage

The task was intentionally limited to approximately 2–3 hours.

I therefore prioritised a small number of meaningful customer journeys rather than trying to maximise the number of tests.

My preference was to demonstrate:

- Risk-based test selection
- Maintainable test structure
- Cypress-specific capabilities
- Failure-state testing
- Reusable test code

rather than create a large suite with shallow assertions.

---

## Page objects

I used lightweight page objects to centralise selectors, particularly because Shadow DOM selectors can otherwise become verbose.

I deliberately avoided placing business logic or complete workflows inside the page objects.

Reusable business actions are instead handled through the tests or Cypress custom commands.

---

## Checkout

Dummy customer and payment information is used because the application is a demonstration environment.

The objective is to validate the application's checkout behaviour rather than interact with a real payment provider.

---

# Known Gaps and Improvements With More Time

With additional time, I would extend the suite in several areas.

### Shopping cart

Additional scenarios would include:

- Multiple products
- Updating quantities
- Removing products
- Empty cart behaviour
- Cart total calculations
- Cart persistence

### Checkout

I would add broader validation around:

- Missing required fields
- Invalid email addresses
- Invalid phone numbers
- Postcode and address validation
- Expired cards
- Invalid card numbers
- Boundary values

### API and integration coverage

I would also investigate testing some business rules directly at the API layer.

This could provide faster feedback for behaviours that do not require full browser interaction.

### Responsive behaviour

Because the application is an online shop, I would add coverage for common mobile and tablet viewports.

### Accessibility

I would consider integrating automated accessibility checks, for example using Axe, alongside targeted manual accessibility testing.

### Cross-browser coverage

The current implementation targets Chrome.

In a production project I would evaluate execution against other supported browsers based on customer usage and risk.

### Reporting

A larger CI implementation could include:

- Test reports
- Screenshots on failure
- Video retention policies
- CI artefacts
- Test result history

---

# AI Usage

I used Cursor’s agent (Grok) to draft page objects and specs, to run the suite headlessly, and to write this README.

I used AI for activities such as:

- Exploring alternative Cypress approaches
- Reviewing selector options
- Discussing Shadow DOM behaviour
- Reviewing network interception approaches
- Reviewing test organisation
- Challenging assumptions in my implementation
- Reviewing README wording

I treated AI output as suggestions rather than automatically accepting generated solutions.

## Example where I reworked AI output

While working on the catalogue-recovery test, an initial AI-assisted suggestion returned a product title that already existed in the application's real catalogue.

I rejected that approach because it could have resulted in a false-positive test: the assertion might pass because the product already existed in the application rather than because the intercepted response had been rendered correctly.

I changed the mocked response to use a distinctive test-only value:

```text
Resilience Test Shell
```

This makes the assertion demonstrate that the application actually processed the controlled intercepted response.

This was a useful example of why AI-generated testing suggestions still need to be reviewed critically against the purpose of the test.

---

# Time Spent

Approximately **2–3 hours** were allocated to:

- Exploring the application
- Identifying and prioritising test scenarios
- Implementing the Cypress suite
- Running and debugging the tests
- Documenting assumptions and trade-offs

---

# Summary

The suite deliberately focuses on three areas:

1. The core customer purchasing journey
2. Checkout and payment validation
3. Behaviour when a backend dependency fails and recovers

The goal was not exhaustive test coverage within the available time, but to demonstrate a maintainable, risk-based Cypress approach that can execute reliably using `cypress run` and could be extended as the application and test strategy evolve.
