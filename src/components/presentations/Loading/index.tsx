import clsx from 'clsx';

type Props = {
  height?: 'screen' | 'full';
  color?: 'primary' | 'white';
  size?: 'small' | 'normal' | 'large';
  className?: string;
};

const Loading = ({ height = 'full', color = 'primary', size = 'normal', className }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        height === 'screen' && 'h-screen',
        height === 'full' && 'h-full',
        className,
      )}
    >
      <div
        className={clsx(
          size === 'small' && 'h-[20px] w-[20px] border-[2px]',
          size === 'normal' && 'h-[40px] w-[40px] border-[4px]',
          size === 'large' && 'h-[60px] w-[60px] border-[6px]',
          color === 'primary' && 'border-green-1',
          color === 'white' && 'border-white',
          'animate-spin',
          'rounded-full',
          'border-t-transparent',
        )}
      />
    </div>
  );
};

export default Loading;
