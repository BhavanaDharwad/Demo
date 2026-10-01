import { defineConfig } from 'cypress';

export default defineConfig({
  defaultBrowser: 'chrome',
  viewportWidth: 1400,
  viewportHeight: 1200,
  
  retries: {
    openMode: 0,
    runMode: 2,
  },
  e2e: {
    baseUrl: 'https://shop.polymer-project.org',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    includeShadowDom: true,
  },
});
