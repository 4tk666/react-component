import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, getAllByRole } from '@storybook/testing-library';
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
      const radioGroupFirstItem = radioGroups.at(0);
      const radioGroupSecondItem = radioGroups.at(1);

      if (!!radioGroupSecondItem && !!radioGroupFirstItem) {
        await userEvent.click(radioGroupSecondItem);

        expect(radioGroupSecondItem.getAttribute('aria-checked')).toEqual('true');
        await userEvent.click(radioGroupFirstItem);
      }
    });

    await step('十字キー移動時にチェックされること', async () => {
      const radioGroups = getAllByRole(canvasElement, 'radio');
      const radioGroupFirstItem = radioGroups.at(0);
      const radioGroupSecondItem = radioGroups.at(1);

      if (!!radioGroupFirstItem && !!radioGroupSecondItem) {
        await userEvent.click(radioGroupFirstItem);

        expect(radioGroupFirstItem.getAttribute('aria-checked')).toEqual('true');

        // 右矢印で移動
        await userEvent.keyboard('[ArrowRight]');

        expect(radioGroupSecondItem.getAttribute('aria-checked')).toEqual('true');

        await userEvent.click(radioGroupFirstItem);
      }
    });
  },
};
