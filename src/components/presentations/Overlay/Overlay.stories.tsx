import { Meta, StoryObj } from '@storybook/react';
import ComOverlay from '.';

const meta = {
  title: 'Overlay',
  component: ComOverlay,
} satisfies Meta<typeof ComOverlay>;

export default meta;

type Story = StoryObj<typeof ComOverlay>;

const RenderOverlay = () => {
  return <ComOverlay>オーバーレイ</ComOverlay>;
};

export const Overlay: Story = {
  render: () => <RenderOverlay />,
};
