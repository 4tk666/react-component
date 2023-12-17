import { Tab as HuiTab } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

export type TabItem = {
  label: string;
  value: number;
  children: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  items: TabItem[];
  panelClassName?: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Tab = ({ items, panelClassName = '', selectedIndex, setSelectedIndex }: Props) => {
  return (
    <HuiTab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <HuiTab.List className={clsx('flex')}>
        {items.map((item) => (
          <HuiTab
            key={item.value}
            disabled={item.disabled}
            className={({ selected }) =>
              clsx(
                'w-[100%] py-[15px]',
                'text-gray-1',
                'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
                'hover:bg-background-3',
                selected
                  ? 'border-b-[5px] border-green-1 text-title-16'
                  : 'text-text-16 hover:cursor-pointer hover:text-title-16',
                item.disabled && 'pointer-events-none opacity-70',
              )
            }
          >
            {item.label}
          </HuiTab>
        ))}
      </HuiTab.List>
      <HuiTab.Panels className={clsx('border-t border-gray-5', 'where:py-[25px]', panelClassName)}>
        {items.map((item) => (
          <HuiTab.Panel
            key={item.value}
            className={clsx(
              'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
            )}
          >
            {item.children}
          </HuiTab.Panel>
        ))}
      </HuiTab.Panels>
    </HuiTab.Group>
  );
};

export default Tab;
