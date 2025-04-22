import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.scss'

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    content,
    title,
    width = '400px',
    confirmText = 'OK',
    cancelText = 'Cancel',
    showFooter = 'true'
}) => {
    const confirmBtnRef = useRef(null)
    const closeBtnRef = useRef(null)
    const modalRef = useRef(null)

    const trapFocus = (e) => {
        // Vérifie si la modale est ouverte avant de manipuler les éléments focusables
        if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }
    }

    useEffect(() => {
        if (isOpen) {
            const confirmBtn = confirmBtnRef.current
            const closeBtn = closeBtnRef.current

            const targetBtn = showFooter ? confirmBtn : closeBtn
            if (targetBtn) {
                targetBtn.focus()

                // Applique forceFocusVisible uniquement sur le bouton Confirm
                if (showFooter && confirmBtn) {
                    confirmBtn.classList.add(styles.forceFocusVisible)

                    const handleBlur = () => {
                        confirmBtn.classList.remove(styles.forceFocusVisible)
                        confirmBtn.removeEventListener('blur', handleBlur)
                    }

                    confirmBtn.addEventListener('blur', handleBlur)
                }
            }
        }

        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                onClose()
            } else if (e.key === 'Tab') {
                trapFocus(e)
            } else if (!showFooter && e.key === 'Enter') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [isOpen, onClose, showFooter])

    if (!isOpen) return null

    const handleCloseOutside = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            onClose()
        }
    }

    const titleId = 'modal-title'
    const contentId = 'modal-content'

    return ReactDOM.createPortal(
        <div
            className={styles.overlay}
            onClick={handleCloseOutside}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={typeof content === 'string' ? contentId : undefined}
        >
            <div
                className={styles.container}
                style={{ width }}
                ref={modalRef}
            >
                {title && (
                    <h2 className={styles.title} id={titleId}>
                        {title}
                    </h2>
                )}

                <button
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close dialog box"
                    ref={closeBtnRef}
                >
                    &times;
                </button>

                <div
                    className={styles.content}
                    id={typeof content === 'string' ? contentId : undefined}
                >
                    {typeof content === 'string' ? <p>{content}</p> : content}
                </div>

                {showFooter && (
                    <div className={styles.footer}>
                        {cancelText && (
                            <button
                                className={`${styles.btn} ${styles.cancel}`}
                                onClick={onClose}
                                aria-label="Cancel"
                            >
                                {cancelText}
                            </button>
                        )}
                        {confirmText && (
                            <button
                                className={`${styles.btn} ${styles.confirm}`}
                                onClick={onConfirm}
                                aria-label="Confirm"
                                ref={confirmBtnRef}
                            >
                                {confirmText}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}

export default Modal