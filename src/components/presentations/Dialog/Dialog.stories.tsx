import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, fireEvent } from '@storybook/testing-library';

import { useState } from 'react';
import Button from '../Button';
import ComDialog from '.';

const meta = {
  title: 'Dialog',
  component: ComDialog,
} satisfies Meta<typeof ComDialog>;

export default meta;

type Story = StoryObj<typeof ComDialog>;

const RenderDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button theme='primary' onClick={() => setIsOpen(true)}>
        open
      </Button>
      <ComDialog title='Dialog Title' open={isOpen} onClose={() => setIsOpen(false)}>
        <div>Dialog Content</div>
        <Button theme='outlined' onClick={() => setIsOpen(false)}>
          close
        </Button>
      </ComDialog>
    </>
  );
};

export const Dialog: Story = {
  render: () => <RenderDialog />,
  play: async ({ canvasElement, step }) => {
    // プライマリーボタンの取得
    const canvas = within(canvasElement);
    const openButton = canvas.getByText('open');

    await step('ボタンクリック後に、モーダルが開きタイトルが取得可能なこと', async () => {
      fireEvent.click(openButton);
      // モーダルが開くのを待つために少し時間を置く
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dialog = document.querySelector('#headlessui-portal-root'); // ポータル先の要素を取得する

      if (!!dialog) {
        const dialogCanvas = within(dialog as HTMLElement);
        const dialogTitle = dialogCanvas.getByText('Dialog Title');
        expect(dialogTitle).toBeInTheDocument();

        const closeButton = dialogCanvas.getByText('close');

        fireEvent.click(closeButton);

        // モーダルが閉じるのを待つために少し時間を置く
        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(dialogTitle).not.toBeInTheDocument();
      }
    });

    await step('Escキーが押されたらモーダルが閉じること', async () => {
      fireEvent.click(openButton);
      // モーダルが開くのを待つために少し時間を置く
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dialog = document.querySelector('#headlessui-portal-root'); // ポータル先の要素を取得する

      if (!!dialog) {
        const dialogCanvas = within(dialog as HTMLElement);
        const dialogTitle = dialogCanvas.getByText('Dialog Title');

        expect(dialogTitle).toBeInTheDocument();

        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

        // モーダルが閉じるのを待つために少し時間を置く
        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(dialogTitle).not.toBeInTheDocument();
      }
    });

    await step('モーダルが開いた時に、モーダル内の要素にフォーカスが当たる要素にフォーカスが当たっていること', async () => {
      fireEvent.click(openButton);
      // モーダルが開くのを待つために少し時間を置く
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dialog = document.querySelector('#headlessui-portal-root') as HTMLElement; // ポータル先の要素を取得する

      if (!!dialog) {
        const dialogCanvas = within(dialog as HTMLElement);
        const dialogTitle = dialogCanvas.getByText('Dialog Title');
        expect(dialogTitle).toBeInTheDocument();

        const closeButton = dialogCanvas.getByText('close');

        expect(closeButton).toHaveFocus();
      }
    });
  },
};
