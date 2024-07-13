import clsx from 'clsx';

type Props = {
  type?: 'page' | 'section' | 'block';
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

const Heading = ({
  type = 'page',
  headingLevel: HeadingLevel = 'h1',
  children,
  className,
}: Props) => (
  <HeadingLevel
    className={clsx(
      type === 'page' && 'text-title-20 text-gray-2',
      type === 'section' && 'text-title-18 text-gray-1',
      type === 'block' && 'text-title-12 text-gray-1',
      'font-bold',
      className,
    )}
  >
    {children}
  </HeadingLevel>
);

export default Heading;
