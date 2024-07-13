import { Meta, StoryObj } from '@storybook/react';
import ComCard from '.';

const meta = {
  title: 'Card',
  component: ComCard,
} satisfies Meta<typeof ComCard>;

export default meta;

type Story = StoryObj<typeof ComCard>;

const RenderCard = () => {
  return <ComCard>カード</ComCard>;
};

export const Card: Story = {
  render: () => <RenderCard />,
};
