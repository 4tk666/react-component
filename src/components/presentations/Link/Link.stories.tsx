import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ComLink from '.';

const meta = {
  title: 'Link',
  component: ComLink,
} satisfies Meta<typeof ComLink>;

export default meta;

type Story = StoryObj<typeof ComLink>;

const RenderLink = () => {
  return (
    <BrowserRouter>
      <ComLink
        to={{
          pathname: '',
        }}
      >
        リンク
      </ComLink>
    </BrowserRouter>
  );
};

export const Link: Story = {
  render: () => <RenderLink />,
};
