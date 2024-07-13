import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Button from '../Button';
import ComToast from '.';

const meta = {
  title: 'Toast',
  component: ComToast,
} satisfies Meta<typeof ComToast>;

export default meta;

type Story = StoryObj<typeof ComToast>;

const RenderToast = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button theme='primary' onClick={() => setIsOpen(true)}>
        トーストオープン
      </Button>
      <ComToast type='approve' isOpen={isOpen} setIsOpen={setIsOpen} message='成功しました' />
    </>
  );
};

export const Toast: Story = {
  render: () => <RenderToast />,
};
