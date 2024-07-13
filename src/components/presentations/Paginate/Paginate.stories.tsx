import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ComPaginate from '.';

const meta = {
  title: 'Paginate',
  component: ComPaginate,
} satisfies Meta<typeof ComPaginate>;

export default meta;

type Story = StoryObj<typeof ComPaginate>;

const RenderPaginate = () => {
  const [forcePage, setForcePage] = useState(0);

  return (
    <ComPaginate
      pageCount={10}
      forcePage={forcePage}
      handlePageClick={({ selected }) => setForcePage(selected)}
    />
  );
};

export const Paginate: Story = {
  render: () => <RenderPaginate />,
};
