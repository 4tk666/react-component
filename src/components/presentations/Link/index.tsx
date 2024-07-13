import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

type To = {
  pathname: string;
  search?: string;
  hash?: string;
};

type Props = {
  to: To;
  children: React.ReactNode;
  icon?: React.ReactElement;
  className?: string;
  locationState?: Record<string, unknown>;
  target?: '_blank' | '_self';
};

const Link = ({ to, children, icon, className, locationState, target = '_self' }: Props) => (
  <RouterLink
    to={to}
    className={clsx(
      'text-text-12 text-green-1 hover:text-green-1',
      'focus-visible:isolate focus-visible:rounded-focus focus-visible:underline focus-visible:shadow-focus focus-visible:outline-none',
      'hover:underline',
      !!icon && 'flex w-fit items-center gap-[5px]',
      className,
    )}
    state={locationState}
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
  >
    {children}
    {!!icon && icon}
  </RouterLink>
);

export default Link;
