import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://192.168.29.54:5174",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});