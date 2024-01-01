import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  var modal = document.getElementById('modal');

  useEffect(() => {
    if (dialog.current) {
      dialog.current.showModal();
      modal?.classList.add('active2');
    }
    return () => {
      if (dialog.current) {
        dialog.current.close();
        modal?.classList.remove('active2');
      }
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="bg-transparent w-full h-full flex justify-center items-center left-6"
    >
      <div className={className}>{children}</div>
    </dialog>,
    document.getElementById('modal')!
  );
};

export default Modal;
