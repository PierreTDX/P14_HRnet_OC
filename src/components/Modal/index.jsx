// Modal.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './modal.scss'

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    content,
    title,
    width = '500px',
    showFooter = false,
    confirmText = 'OK',
    cancelText = 'Cancel'
}) => {

    if (!isOpen) return null

    const handleCloseOutside = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose()
        }
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleCloseOutside}>
            <div className="modal-container" style={{ width }}>
                {title && <h2 className="modal-title">{title}</h2>}
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-content">
                    {typeof content === 'string' ? <p>{content}</p> : content}
                </div>

                {showFooter && (
                    <div className="modal-footer">
                        <button className="btn btn-cancel" onClick={onClose}>
                            {cancelText}
                        </button>
                        <button className="btn btn-confirm" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}

export default Modal