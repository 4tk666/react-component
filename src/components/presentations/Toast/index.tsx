import * as RadToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import {
  AiOutlineWarning,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';

type Props = {
  type: 'approve' | 'warning' | 'error';
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  message: string;
};

const Toast = ({ type, isOpen, setIsOpen, message }: Props) => {
  return (
    <RadToast.Provider duration={3000}>
      <RadToast.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className={clsx(
          type === 'approve' && 'bg-green-1',
          type === 'warning' && 'bg-yellow-1',
          type === 'error' && 'bg-red-1',
          'data-state-open:animate-cutin',
          'data-state-closed:animate-cutout',
          'shadow-lg',
          'rounded',
          'text-white',
          'px-[20px] py-[10px]',
          'flex items-center space-x-2',
          'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
        )}
      >
        <RadToast.Title className={clsx('flex items-center gap-[10px]')}>
          {type === 'approve' && <AiOutlineCheck />}
          {type === 'warning' && <AiOutlineWarning />}
          {type === 'error' && <AiOutlineExclamationCircle />}
          {message}
        </RadToast.Title>
        <RadToast.Close
          className={clsx(
            'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
          )}
        >
          <AiOutlineClose />
        </RadToast.Close>
      </RadToast.Root>

      <RadToast.Viewport className={clsx('fixed right-[30px] top-[80px] z-toast')} />
    </RadToast.Provider>
  );
};

export default Toast;
