import { Meta, StoryObj } from '@storybook/react';
import ComHeading from '.';

const meta = {
  title: 'Heading',
  component: ComHeading,
} satisfies Meta<typeof ComHeading>;

export default meta;

type Story = StoryObj<typeof ComHeading>;

const RenderHeading = () => {
  return <ComHeading headingLevel='h1'>見出し</ComHeading>;
};

export const Heading: Story = {
  render: () => <RenderHeading />,
};
