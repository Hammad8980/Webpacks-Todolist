import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async config => {
    // Add PostCSS processing for Tailwind CSS
    const cssRule = config.module?.rules?.find(rule => {
      if (typeof rule === 'object' && rule && 'test' in rule && rule.test) {
        return rule.test.toString().includes('.css');
      }
      return false;
    });

    if (cssRule && typeof cssRule === 'object' && 'use' in cssRule && Array.isArray(cssRule.use)) {
      // Find if postcss-loader already exists
      const hasPostCSS = cssRule.use.some(loader => {
        if (typeof loader === 'object' && loader && 'loader' in loader) {
          return loader.loader?.includes('postcss-loader');
        }
        return false;
      });

      // Add postcss-loader if it doesn't exist
      if (!hasPostCSS) {
        cssRule.use.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        });
      }
    }

    return config;
  },
};

export default config;
