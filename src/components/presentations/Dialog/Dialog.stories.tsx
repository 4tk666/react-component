/* eslint-disable import/named */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentProps } from 'react';

import Dialog from '.';

export default {
  title: 'Dialog',
  component: Dialog,
  argTypes: {},
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

const args: ComponentProps<typeof Dialog> = {
  open: true,
  title: '新規登録',
  onClose: () => {
    return;
  },
  children: <p>サンプルサンプルサンプル</p>,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
};
