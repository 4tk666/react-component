import clsx from 'clsx';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<`button`> & {
  theme: 'primary' | 'secondary' | 'outlined';
  size?: 'large' | 'regular' | 'small';
};

const Button = ({ children, theme, size = 'regular', disabled, ...props }: Props) => (
  <button
    type='button'
    disabled={disabled}
    className={clsx(
      'font-bold',
      'hover:shadow-button focus:border focus:border-blue-1 focus:shadow-focus focus:outline-none',
      theme === 'primary' &&
        'bg-gradient-button-primary text-white hover:bg-gradient-button-primary-hover',
      // NOTE: グラデーションはグラデーションでしかオーバーライドできないので、このような形にしている。また「where:」が「bg-gradient」に上手く指定できないので、ここだけimportantを使用
      theme === 'primary' &&
        size === 'regular' &&
        '!bg-button-primary-regular hover:!bg-button-primary-regular-hover',
      theme === 'secondary' && 'bg-background-2 text-gray-2',
      theme === 'outlined' && 'border border-green-1 text-green-1 hover:bg-background-2',
      size === 'large' && 'rounded-[22px] px-[89px] pb-[12px] pt-[14px] text-[16px]',
      size === 'regular' && 'rounded-[8px] px-[20px] py-[7.5px] text-[14px]',
      size === 'small' && 'rounded-[44px] px-[18px] py-[6px] text-[12px]',
      disabled && 'pointer-events-none opacity-[40%]',
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
