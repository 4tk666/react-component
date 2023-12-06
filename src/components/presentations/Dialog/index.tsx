import { Dialog as HuiDialog } from '@headlessui/react';
import clsx from 'clsx';
import { useRef } from 'react';

type Props = {
  open: boolean;
  title: string;
  subTitle?: string;
  panelClassName?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Dialog = ({ open, title, children, subTitle = '', panelClassName = '', onClose }: Props) => {
  const focusElementRef = useRef(null);

  return (
    <HuiDialog open={open} onClose={onClose} initialFocus={focusElementRef}>
      <div className={clsx('fixed inset-0 z-modalBack bg-black opacity-70')} aria-hidden='true' />

      <HuiDialog.Panel>
        <div
          className={clsx(
            'fixed left-[50%] top-[50%] z-modalContent translate-x-[-50%] translate-y-[-50%]',
            'p-[40px] where:max-w-[600px]',
            'rounded-modal',
            'bg-white',
            panelClassName,
          )}
        >
          <HuiDialog.Title
            as='h3'
            className={clsx('mb-[30px]', 'text-center text-[20px] font-bold text-gray-1')}
          >
            {title}
            {!!subTitle && (
              <p className={clsx('text-[14px] font-normal', 'mt-[15px]')}>{subTitle}</p>
            )}
          </HuiDialog.Title>
          {children}

          {/* NOTE: モーダルが開かれたときに中の要素にFocusが当たらないように設定 */}
          {/* https://headlessui.com/react/dialog#managing-initial-focus */}
          <div ref={focusElementRef} />
        </div>
      </HuiDialog.Panel>
    </HuiDialog>
  );
};

export default Dialog;
