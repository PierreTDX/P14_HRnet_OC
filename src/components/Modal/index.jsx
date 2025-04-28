import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.scss'

const Modal = ({
    isOpen, // Détermine si la modale est ouverte
    onClose, // Fonction pour fermer la modale
    onConfirm, // Fonction pour confirmer l'action
    content, // Le contenu de la modale
    title, // Le titre de la modale
    width = '400px', // Largeur de la modale
    confirmText = 'OK', // Texte du bouton de confirmation
    cancelText = 'Cancel', // Texte du bouton d'annulation
    showFooter = true, // Décide si le pied de page avec les boutons doit être affiché
    className = 'modal-wrapper', // Classe personnalisée pour la modale
    variant = 'default' // ➔ 'default' | 'success' | 'error'
}) => {

    const confirmBtnRef = useRef(null) // Référence au bouton de confirmation
    const closeBtnRef = useRef(null) // Référence au bouton de fermeture
    const modalRef = useRef(null) // Référence à l'élément modal

    // State pour gérer si la modale doit être rendue et si l'animation de fermeture doit être activée
    const [shouldRender, setShouldRender] = useState(isOpen)
    const [animationOut, setAnimationOut] = useState(false)

    // Fonction pour gérer le focus dans la modale
    const trapFocus = (e) => {
        if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.key === 'Tab') {
                // Si Tab est pressé et on est sur le premier ou dernier élément focusable, on le redirige
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

        const html = document.documentElement;

        if (isOpen) {

            // Désactive le défilement
            html.style.overflow = 'hidden';

            // Si la modale est ouverte, on l'affiche et on applique l'animation d'entrée
            setShouldRender(true);
            setAnimationOut(false);

            const confirmBtn = confirmBtnRef.current;
            const closeBtn = closeBtnRef.current;
            const targetBtn = showFooter ? confirmBtn : closeBtn;

            if (targetBtn) {
                targetBtn.focus();

                // Applique un style de focus forcé au bouton de confirmation si showFooter est vrai
                if (showFooter && confirmBtn) {
                    confirmBtn.classList.add(styles.forceFocusVisible, 'modal-forceFocusVisible');
                    const handleBlur = () => {
                        confirmBtn.classList.remove(styles.forceFocusVisible, 'modal-forceFocusVisible');
                        confirmBtn.removeEventListener('blur', handleBlur);
                    };
                    confirmBtn.addEventListener('blur', handleBlur);
                }
            }

        } else {
            // Lorsque la modale se ferme, on active l'animation de fermeture et on arrête le rendu après 300ms
            setAnimationOut(true);

            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 300);

            return () => clearTimeout(timeout);
        }

        // Gestion des événements clavier (fermeture avec Escape, focus avec Tab)
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'Tab') {
                trapFocus(e);
            } else if (!showFooter && e.key === 'Enter') {
                onClose();
            }
        };

        // Écouteur d'événements sur le clavier
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            // Réactivation du défilement
            html.style.overflow = '';
        };

    }, [isOpen, onClose, showFooter]);

    // Si la modale ne doit pas être rendue, rien n'est affiché
    if (!shouldRender) return null

    // Gestion de la fermeture de la modale en cliquant à l'extérieur
    const handleCloseOutside = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            onClose()
        }
    }

    const titleId = 'modal-title'
    const contentId = 'modal-content'
    const containerClass = `${styles.container} ${animationOut ? styles.containerFadeOut : ''} ${variant === 'success' ? styles.success : ''} ${variant === 'error' ? styles.error : ''}`;

    return ReactDOM.createPortal(
        <div className={`${className}`}>
            <div
                className={`modal-overlay ${styles.overlay} ${animationOut ? styles.overlayFadeOut : ''}`}
                onClick={handleCloseOutside}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={typeof content === 'string' ? contentId : undefined}
            >
                <div
                    className={`modal-border ${variant === 'default' ? 'modal-container' : ''} ${variant === 'success' ? 'modal-container-success' : ''} ${variant === 'error' ? 'modal-container-error' : ''} ${containerClass}`}
                    style={{ width }}
                    ref={modalRef}
                >
                    {title && (
                        <h2 className={`modal-title ${styles.title}`} id={titleId}>
                            {title}
                        </h2>
                    )}

                    <button
                        className={`modal-close ${styles.close}`}
                        onClick={onClose}
                        aria-label="Close dialog box"
                        ref={closeBtnRef}
                        title="Close dialog box"
                    >
                        &times;
                    </button>

                    <div
                        className={`modal-content ${styles.content}`}
                        id={typeof content === 'string' ? contentId : undefined}
                    >
                        {typeof content === 'string' ? <p>{content}</p> : content}
                    </div>

                    {showFooter && (
                        <div className={`modal-footer ${styles.footer}`}>
                            {cancelText && (
                                <button
                                    className={`modal-btn modal-btn-cancel ${styles.btn} ${styles.cancel}`}
                                    onClick={onClose}
                                    aria-label="Cancel"
                                    title="Cancel"
                                >
                                    {cancelText}
                                </button>
                            )}
                            {confirmText && (
                                <button
                                    className={`modal-btn modal-btn-confirm ${styles.btn} ${styles.confirm}`}
                                    onClick={onConfirm}
                                    aria-label="Confirm"
                                    ref={confirmBtnRef}
                                    title="Confirm"
                                >
                                    {confirmText}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal