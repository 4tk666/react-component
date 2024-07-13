import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
};

const Overlay = ({ children }: Props) => {
  return (
    <div className='flex justify-center'>
      <div
        className={clsx(
          'w-[95%]',
          'min-h-[90px] p-[15px]',
          'fixed bottom-0',
          'flex items-center justify-between',
          'rounded-t-overlay',
          'bg-white shadow-overlay',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
