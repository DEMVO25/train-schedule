import "./dialog.css";

interface DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  closeForm: () => void;
}

function Dialog({ open, title, children, closeForm }: DialogProps) {
  return (
    <dialog className={open ? "dialog" : "dialog-closed"}>
      <div className="dialog-content">
        <div className="button-container">
          <button className="close-button" onClick={() => closeForm()}>X</button>
        </div>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </dialog>
  );
}

export default Dialog;
