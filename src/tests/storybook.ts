import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const myViewports = {
  iPhoneSE: {
    name: 'iPhone SE',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
}

export const SPStory = {
  parameters: {
    viewport: {
      viewports: {
        iPhoneSE: {
          name: 'SP',
          styles: {
            width: '400px',
            height: '680px',
          },
        },
      },
      defaultViewport: 'iPhoneSE',
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
}

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
}
