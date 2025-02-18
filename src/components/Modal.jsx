import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-stone-900/90 p-4 rounded-md shadow-md "
    >
      {children}
      <form method="dialog" className="flex justify-center">
        <Button className="mt-5 bg-stone-500 px-2 py-1 rounded-sm hover:text-white">
          {buttonCaption}
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
