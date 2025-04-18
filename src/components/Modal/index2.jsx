import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './modal.scss'

const Modal2 = ({
    triggerText = 'Ouvrir la modale',
    title,
    content,
    onConfirm,
    confirmText = 'OK',
    cancelText = 'Cancel',
    showFooter = false,
    width = '500px'
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const handleConfirm = () => {
        onConfirm && onConfirm()
        setIsOpen(false)
    }

    const handleCloseOutside = (e) => {
        // Empêche la fermeture si on clique à l'intérieur de la boîte
        if (e.target.classList.contains('modal-overlay')) {
            setIsOpen(false)
        }
    }


    return (
        <>
            <button onClick={handleOpen}>{triggerText}</button>

            {isOpen &&
                ReactDOM.createPortal(
                    <div className="modal-overlay" onClick={handleCloseOutside}>
                        <div className="modal-container" style={{ width }}>
                            {title && <h2 className="modal-title">{title}</h2>}
                            <button className="modal-close" onClick={handleClose}>
                                &times;
                            </button>

                            <div className="modal-content">
                                {typeof content === 'string' ? <p>{content}</p> : content}
                            </div>

                            {showFooter && (
                                <div className="modal-footer">
                                    <button className="btn btn-cancel" onClick={handleClose}>
                                        {cancelText}
                                    </button>
                                    <button className="btn btn-confirm" onClick={handleConfirm}>
                                        {confirmText}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}
export default Modal2