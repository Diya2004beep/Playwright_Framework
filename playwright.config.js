require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

// Run a single browser via: BROWSER=firefox npm test
// Falls back to chromium when not set.
const BROWSER = (process.env.BROWSER || 'chromium').toLowerCase();

const allProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
];

// If BROWSER=all, run every project; otherwise run only the requested one.
const activeProjects = BROWSER === 'all'
  ? allProjects
  : allProjects.filter(p => p.name === BROWSER);

module.exports = defineConfig({
  testDir: './specs',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['list'],
  ],
  timeout: 120_000,
  use: {
    baseURL: process.env.BASE_URL || 'https://uae.sdgstage.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    actionTimeout:    30_000,
    navigationTimeout: 60_000,
    httpCredentials: process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD ? {
      username: process.env.BASIC_AUTH_USER,
      password: process.env.BASIC_AUTH_PASSWORD,
    } : undefined,
  },
  projects: activeProjects,
  outputDir: 'reports/test-results',
});
