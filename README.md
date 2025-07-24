# PlaywrightAutomation Test Suite

This repository contains automated UI tests for the Festo website using [Playwright](https://playwright.dev/). The suite covers core user flows such as shopping cart management, product configuration, footer navigation, and contact form validation.

## Prerequisites

- Node.js (v16+ recommended)
- [Playwright](https://playwright.dev/docs/intro)
- Chrome, Firefox, and WebKit browsers (Playwright can install these automatically)

## Project Structure

## How to Run

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run all tests:
   ```sh
   npx playwright test
   ```

3. Run a specific test file:
   ```sh
   npx playwright test tests/cart.spec.ts
   ```

4. Run in a playwright debugger:
   ```sh
   npx playwright test --ui
   ```

## Tests Overview

### 1. Shopping Cart (`cart.spec.ts`)
- Logs in to the site.
- Empties the cart if needed.
- Adds products ("Servo drive", "Motion terminal") to the cart.
- Verifies successful addition messages.
- Clears the cart and checks for the empty cart message.

### 2. Product Configuration (`product-configuration.spec.ts`)
- Logs in and searches for a specific product.
- Opens the product configuration iframe.
- Selects options for piston diameter, material, and cushioning.
- Navigates through "Options" and "Overview" sections.
- Verifies that the selected configuration values are correct.

### 3. Footer Navigation (`footer.spec.ts`)
- Handles cookie consent.
- Checks visibility of key footer links (Imprint, Data privacy, Cookie settings, Terms and conditions).
- Clicks each link and verifies the expected headline or content.
- Navigates back after each check.

### 4. Contact Us Form (`contact-us.spec.ts`)
- Handles cookie consent.
- Navigates to the contact form.
- Fills out and submits the form.
- Verifies validation feedback for required fields.

### 5. Cart Management (`cart.spec.ts`)
- (Duplicate filename, but covers the same flow as above.)

## Customization

- Test selectors are managed in the `selectors` module for easy maintenance.
- Credentials and test data are stored in utility files.

## Notes

- All tests launch browsers in non-headless mode and maximized window for easier debugging.
- The suite is designed for demonstration and regression testing of key user journeys.

## Troubleshooting

- If tests fail due to selector changes, update the relevant selectors in the `selectors` module.
- For flaky tests, increase timeouts or add explicit waits where necessary.

---

**For more details, see individual test files in the `tests/` directory.**
