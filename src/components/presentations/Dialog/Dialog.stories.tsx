import { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
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

      {isOpen && (
        <ComDialog title='Dialog Title' open={isOpen} onClose={() => setIsOpen(false)}>
          <div>Dialog Content</div>
          <Button theme='outlined' onClick={() => setIsOpen(false)}>
            close
          </Button>
          <Button theme='outlined' onClick={() => undefined}>
            register
          </Button>
        </ComDialog>
      )}
    </>
  );
};

export const Dialog: Story = {
  render: () => <RenderDialog />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    // openボタンの取得
    const openButton = canvas.queryByRole('button', { name: 'open' });
    // openボタンが見つからない場合はエラーをスロー
    if (!openButton) throw new Error('open button not found');

    // ダイアログ要素の取得
    const getDialogElement = () => {
      const dialog = document.querySelector('#headlessui-portal-root');
      if (!dialog) throw new Error('Dialog not found');
      return dialog;
    };

    await step('ボタンクリック後に、モーダルが開きタイトルが取得可能なこと', async () => {
      await userEvent.click(openButton);

      const dialogElement = getDialogElement();
      const dialogCanvas = within(dialogElement as HTMLElement);

      const dialogTitle = dialogCanvas.getByText('Dialog Title');
      // ダイアログタイトルが取得できることを確認
      expect(dialogTitle).toBeInTheDocument();

      const closeButton = dialogCanvas.getByText('close');
      await userEvent.click(closeButton);
      expect(dialogTitle).not.toBeInTheDocument();
    });

    await step('Escキーが押されたら、モーダルが閉じること', async () => {
      await userEvent.click(openButton);

      const dialogElement = getDialogElement();
      const dialogCanvas = within(dialogElement as HTMLElement);

      const dialogTitle = dialogCanvas.getByText('Dialog Title');
      expect(dialogTitle).toBeInTheDocument();

      // Escキーを押してモーダルを閉じる
      await userEvent.type(dialogElement as Element, '{esc}');
      expect(dialogTitle).not.toBeInTheDocument();
    });

    await step('モーダル背景がクリックされたら、モーダルが閉じること', async () => {
      await userEvent.click(openButton);

      const dialogElement = getDialogElement();
      const dialogCanvas = within(dialogElement as HTMLElement);
      // ダイアログ背景を取得、やむを得ずクラス名で取得、「z-modalBack」はz-indexの値でかぶらないようにしている
      const dialogBackdrop = document.querySelector('.z-modalBack');

      if (!dialogBackdrop) throw new Error('dialogBackdrop not found');

      const dialogTitle = dialogCanvas.getByText('Dialog Title');
      expect(dialogTitle).toBeInTheDocument();

      await userEvent.click(dialogBackdrop);
      expect(dialogTitle).not.toBeInTheDocument();
    });

    await step(
      'モーダルが開いた時に、モーダル内の要素にフォーカスが当たる要素にフォーカスが当たっていること',
      async () => {
        await userEvent.click(openButton);

        const dialogElement = getDialogElement();
        const dialogCanvas = within(dialogElement as HTMLElement);

        const dialogTitle = dialogCanvas.getByText('Dialog Title');
        expect(dialogTitle).toBeInTheDocument();

        const closeButton = dialogCanvas.getByText('close');
        // 最初のフォーカス要素であるcloseボタンにフォーカスが当たっていることを確認
        expect(closeButton).toHaveFocus();

        await userEvent.click(closeButton);
        expect(dialogTitle).not.toBeInTheDocument();
      },
    );

    await step(
      'フォーカストラップ：ダイアログが開いているとき、フォーカスはダイアログ内に留まること',
      async () => {
        await userEvent.click(openButton);

        const dialogElement = getDialogElement();
        const dialogCanvas = within(dialogElement as HTMLElement);
        const closeButton = dialogCanvas.getByText('close');
        const registerButton = dialogCanvas.getByText('register');

        // Tabキーを押してフォーカスを移動
        // モーダルが開いた時には、モーダル内の要素にフォーカスが当たる要素にフォーカスが当たっているので、2つ目の要素にフォーカスが移動する
        await userEvent.tab();
        expect(registerButton).toHaveFocus();

        // 再度Tabキーを押してフォーカスを移動すると、フォーカスはダイアログ内に留まる
        await userEvent.tab();
        expect(closeButton).toHaveFocus();

        await userEvent.click(closeButton);
      },
    );

    await step(
      'ロールとARIA属性:ダイアログ要素にはrole="dialog"/aria-modal="true"が付与されていること',
      async () => {
        await userEvent.click(openButton);

        // ダイアログ要素を取得
        const dialogElement = getDialogElement();
        const dialogCanvas = within(dialogElement as HTMLElement);
        const closeButton = dialogCanvas.getByText('close');
        const dialogRote = dialogCanvas.queryByRole('dialog');

        // ダイアログ要素にrole="dialog"、aria-modal="true"が付与されていることを確認
        expect(dialogRote).toHaveAttribute('role', 'dialog');
        expect(dialogRote).toHaveAttribute('aria-modal', 'true');

        await userEvent.click(closeButton);
      },
    );
  },
};
