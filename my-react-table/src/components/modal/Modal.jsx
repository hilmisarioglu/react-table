import "./Modal.css";
export default function Modal({ children, closeModal }) {
  return (
    <div
      className="modal-container"
      onClick={(evt) => {
        if (evt.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      <div className="modal">{children}</div>
    </div>
  );
}
