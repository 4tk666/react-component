import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within, fireEvent, getAllByRole } from '@storybook/testing-library';

import { useState } from 'react';
import ComTab, { TabItem } from '.';

const meta = {
  title: 'Tab',
  component: ComTab,
} satisfies Meta<typeof ComTab>;

export default meta;

type Story = StoryObj<typeof ComTab>;

const RenderTab = () => {
  const [value, setValue] = useState(0);

  const items: TabItem[] = [
    {
      label: 'タブ1',
      value: 0,
      children: <div>タブコンテント1</div>,
    },
    {
      label: 'タブ2',
      value: 1,
      children: <div>タブコンテント2</div>,
    },
    {
      label: 'タブ3',
      value: 2,
      children: <div>タブコンテント3</div>,
    },
  ];

  return <ComTab items={items} selectedIndex={value} setSelectedIndex={(v) => setValue(v)} />;
};

export const Tab: Story = {
  render: () => <RenderTab />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('itemsで渡した要素がタブとして表示されること', async () => {
      const tabTitle1 = canvas.getByText('タブ1');
      expect(tabTitle1).toBeInTheDocument();
    });

    await step('タブをクリック時に表示されるコンテンツが変更されること', async () => {
      const tabs = getAllByRole(canvasElement, 'tab');
      const tabItem2 = tabs.at(1);

      if (!!tabItem2) {
        fireEvent.click(tabItem2);

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(tabItem2.getAttribute('aria-selected')).toEqual('true');
        expect(canvas.getByText('タブコンテント2')).toBeInTheDocument();
      }
    });

    await step('十字キー移動時にチェックされること', async () => {
      const tabs = getAllByRole(canvasElement, 'tab');
      const tabItem1 = tabs.at(0);
      const tabItem2 = tabs.at(1);

      if (!!tabItem1 && !!tabItem2) {
        fireEvent.click(tabItem1);
        tabItem1.focus();

        await new Promise((resolve) => setTimeout(resolve, 300));

        // // 右矢印で移動
        fireEvent.keyDown(tabItem1, { key: 'ArrowRight', keyCode: 39 });

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(tabItem2.getAttribute('aria-selected')).toEqual('true');
      }
    });
  },
};
