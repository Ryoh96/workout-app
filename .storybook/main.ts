import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="styles/global.css" />
  `,
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': path.resolve(__dirname, '../src'),
    }
    return config
  },
}
export default config
