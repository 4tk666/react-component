import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  render: () => <Button theme='primary'>Primary Button</Button>,
};

export const SecondaryButton: Story = {
  render: () => <Button theme='secondary'>Secondary Button</Button>,
};

export const OutlinedButton: Story = {
  render: () => <Button theme='outlined'>Outlined Button</Button>,
};
