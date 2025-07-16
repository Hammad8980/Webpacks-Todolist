import type { Preview } from '@storybook/react-webpack5';
import '../src/index.css'; // Import Tailwind CSS

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111827', // Tailwind gray-900
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
