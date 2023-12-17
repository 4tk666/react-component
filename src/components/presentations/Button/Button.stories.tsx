import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, fireEvent } from '@storybook/testing-library';

import Button from '.';

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  render: () => <Button theme='primary'>Primary Button</Button>,
  play: async ({ canvasElement, step }) => {
    // プライマリーボタンの取得
    const canvas = within(canvasElement);
    const primaryButton = canvas.getByText('Primary Button');

    await step('ボタンにLabelの文字列が表示されている', async () => {
      await expect(primaryButton).toBeInTheDocument();
    });

    await step('ボタンフォーカス時にフォーカススタイルが適用される', async () => {
      fireEvent.focus(primaryButton);

      // ボタンがフォーカスを受け取る時間を与えるため、少し待つ
      await new Promise((resolve) => setTimeout(resolve, 100));

      // ボタンにフォーカスがあるときに適用されるスタイルを確認する（例：特定のクラスが存在することを検証）
      expect(primaryButton).toHaveClass(
        'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
      );
    });
  },
};

export const SecondaryButton: Story = {
  render: () => <Button theme='secondary'>Secondary Button</Button>,
};

export const OutlinedButton: Story = {
  render: () => <Button theme='outlined'>Outlined Button</Button>,
};
