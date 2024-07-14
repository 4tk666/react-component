import { Meta, StoryObj } from '@storybook/react';
import ComCard from '.';

const meta: Meta<typeof ComCard> = {
  title: 'Card',
  component: ComCard,
  argTypes: {
    color: {
      control: 'radio',
      options: ['white', 'gray'],
    },
    children: {
      control: 'text',
    },
    disableRounded: {
      control: 'boolean',
    },
    disablePadding: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ComCard>;

export default meta;

type Story = StoryObj<typeof ComCard>;

export const Card: Story = {
  args: {
    color: 'white',
    children: 'カード',
  },
  render: (args) => <ComCard {...args} />,
};
