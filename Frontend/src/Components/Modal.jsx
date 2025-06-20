const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose} className="close-btn">×</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  