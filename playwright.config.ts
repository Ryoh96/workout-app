import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'
import path from 'path'

const PORT = process.env.PORT || 3000
const baseURL = `http://localhost:${PORT}`

const config: PlaywrightTestConfig = {
  timeout: 5 * 1000,
  testDir: './src/e2e',
  retries: 0,
  webServer: {
    command: 'npm start',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  globalSetup: './src/e2e/config/global-setup.ts',
  use: {
    baseURL,
    storageState: './src/e2e/config/storageState.json',
  },
  reporter: [['html', { open: 'always' }]],
  projects: [
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
}
export default config
