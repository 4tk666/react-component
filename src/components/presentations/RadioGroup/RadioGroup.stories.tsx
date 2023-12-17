import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, fireEvent, getAllByRole } from '@storybook/testing-library';

import { useState } from 'react';
import ComRadioGroup, { RadioGroupItem } from '.';

const meta = {
  title: 'RadioGroup',
  component: ComRadioGroup,
} satisfies Meta<typeof ComRadioGroup>;

export default meta;

type Story = StoryObj<typeof ComRadioGroup>;

const RenderRadioGroup = () => {
  const [value, setValue] = useState('1');

  const items: RadioGroupItem<string>[] = [
    {
      label: 'ラジオ1',
      value: '1',
    },
    {
      label: 'ラジオ2',
      value: '2',
    },
    {
      label: 'ラジオ3',
      value: '3',
    },
  ];

  return <ComRadioGroup items={items} value={value} onValueChange={setValue} />;
};

export const RadioGroup: Story = {
  render: () => <RenderRadioGroup />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('itemsで渡した要素がラジオボタンとして表示されること', async () => {
      const radio1Title = canvas.getByText('ラジオ1');
      expect(radio1Title).toBeInTheDocument();
    });

    await step('ラジオボタンをクリック時にチェックされること', async () => {
      const radioGroups = getAllByRole(canvasElement, 'radio');
      const radioGroupSecondItem = radioGroups.at(1);

      if (!!radioGroupSecondItem) {
        fireEvent.click(radioGroupSecondItem);

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(radioGroupSecondItem.getAttribute('aria-checked')).toEqual('true');
      }
    });

    await step('十字キー移動時にチェックされること', async () => {
      const radioGroups = getAllByRole(canvasElement, 'radio');
      const radioGroupFirstItem = radioGroups.at(0);
      const radioGroupSecondItem = radioGroups.at(1);

      if (!!radioGroupFirstItem && !!radioGroupSecondItem) {
        radioGroupFirstItem.focus();

        await new Promise((resolve) => setTimeout(resolve, 300));

        // 右矢印で移動
        fireEvent.keyDown(radioGroupFirstItem, { key: 'ArrowRight', keyCode: 39 });

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(radioGroupSecondItem.getAttribute('aria-checked')).toEqual('true');
      }
    });
  },
};
