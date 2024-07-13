import { Meta, StoryObj } from '@storybook/react';
import ComLoading from '.';

const meta = {
  title: 'Loading',
  component: ComLoading,
} satisfies Meta<typeof ComLoading>;

export default meta;

type Story = StoryObj<typeof ComLoading>;

const RenderLoading = () => {
  return <ComLoading />;
};

export const Loading: Story = {
  render: () => <RenderLoading />,
};
