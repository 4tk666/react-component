import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    theme: {
      control: 'radio',
      options: ['primary', 'secondary', 'outlined'],
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    theme: 'primary',
    children: 'Primary Button',
  },
  render: (args) => <Button {...args} />,
  play: async ({ canvasElement, step }) => {
    // プライマリーボタンの取得
    const canvas = within(canvasElement);
    const primaryButton = canvas.getByText('Primary Button');

    await step('ボタンにLabelの文字列が表示されている', async () => {
      await expect(primaryButton).toBeInTheDocument();
    });

    await step('ボタンフォーカス時にフォーカススタイルが適用される', async () => {
      await userEvent.tab();

      expect(primaryButton).toHaveClass(
        'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
      );
      expect(primaryButton).toHaveFocus();
    });
  },
};

export const SecondaryButton: Story = {
  args: {
    theme: 'secondary',
    children: 'Secondary Button',
  },
  render: (args) => <Button {...args} />,
};

export const OutlinedButton: Story = {
  args: {
    theme: 'outlined',
    children: 'Outlined Button',
  },
  render: (args) => <Button {...args} />,
};
