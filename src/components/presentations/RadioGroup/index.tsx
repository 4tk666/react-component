import { RadioGroup as HuiRadioGroup } from '@headlessui/react';
import clsx from 'clsx';

export type RadioGroupItem<T extends string | number> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type RadioGroupProps<T extends string | number> = {
  label?: string;
  items: RadioGroupItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  disabled?: boolean;
};

const RadioGroup = <T extends string | number>({
  label,
  items,
  value,
  onValueChange,
  disabled,
}: RadioGroupProps<T>) => {
  return (
    <HuiRadioGroup value={value} onChange={onValueChange} disabled={disabled}>
      <div
        className={clsx(
          'flex flex-wrap items-start gap-[20px]',
          disabled && 'pointer-events-none opacity-40',
        )}
      >
        {!!label && <HuiRadioGroup.Label>{label}</HuiRadioGroup.Label>}

        {items.map((item) => (
          <HuiRadioGroup.Option
            key={item.value}
            value={item.value}
            className={clsx(
              'focus-visible:rounded-focus focus-visible:border focus-visible:border-blue-1 focus-visible:outline-none',
            )}
            disabled={item.disabled}
          >
            {({ checked }) => (
              <div
                className={clsx(
                  'flex w-[100%] items-center gap-[20px]',
                  item.disabled && 'pointer-events-none opacity-40',
                )}
              >
                <div className={clsx('flex items-start gap-[5px]', 'w-[100%] cursor-pointer')}>
                  {/* ラジオボタン */}
                  <div
                    className={clsx(
                      'h-[16px] w-[16px]',
                      'rounded-full where:border-[1px] where:border-gray-2',
                      'bg-white',
                      'relative',
                      'shrink-0',
                      checked && 'border-[5px] border-green-1',
                    )}
                  />
                  <HuiRadioGroup.Label
                    className={clsx(
                      'cursor-pointer',
                      'w-[calc(100%_-_21px)] text-[12px]',
                      'break-words',
                    )}
                  >
                    {item.label}
                  </HuiRadioGroup.Label>
                </div>
              </div>
            )}
          </HuiRadioGroup.Option>
        ))}
      </div>
    </HuiRadioGroup>
  );
};

export default RadioGroup;
