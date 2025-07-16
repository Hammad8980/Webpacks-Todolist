import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from './Button';

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component that accepts all standard HTML button attributes.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Button content',
      control: 'text',
    },
    className: {
      description: 'CSS classes to apply to the button',
      control: 'text',
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
    },
    onClick: {
      description: 'Click handler function',
      action: 'clicked',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => console.log('Button clicked'),
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className:
      'px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl',
    onClick: () => console.log('Primary button clicked'),
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    className:
      'px-6 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-all duration-200',
    onClick: () => console.log('Secondary button clicked'),
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    className:
      'px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200',
    onClick: () => console.log('Danger button clicked'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    className: 'px-6 py-3 bg-gray-400 text-gray-200 rounded-lg cursor-not-allowed',
    disabled: true,
    onClick: () => console.log('This should not log'),
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </>
    ),
    className:
      'flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200',
    onClick: () => console.log('Icon button clicked'),
  },
};
