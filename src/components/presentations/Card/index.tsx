import clsx from 'clsx';

type Props = {
  color?: 'white' | 'gray';
  className?: string;
  disableRounded?: boolean;
  disablePadding?: boolean;
  children: React.ReactNode;
};

const Card = ({
  color = 'white',
  disableRounded = false,
  disablePadding = false,
  className = '',
  children,
}: Props) => (
  <div
    className={clsx(
      color === 'white' && 'bg-white shadow-sheet',
      color === 'gray' && 'bg-[#f6f8fb] shadow-none',
      disableRounded ? 'rounded-none' : 'rounded-[14px]',
      disablePadding ? 'p-[0px]' : 'where:p-[20px]',
      className,
    )}
  >
    {children}
  </div>
);

export default Card;
