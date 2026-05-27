import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://37.27.17.198:8084",
    specPattern: "scr/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "scr/support/e2e.ts",
  },
});
