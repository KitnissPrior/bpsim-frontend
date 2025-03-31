import "./creationModal.css"
import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void
    title?: string;
    content: React.ReactNode;
    className?: string
}

const FormModal: React.FC<IProps> = (
    { isOpen, title, content, className, onClose }) => {

    const modalRef = React.useRef(null);

    return (
        <Modal show={isOpen} ref={modalRef} className={className ? className : ""}
            keyboard={false} backdrop='static' enforceFocus={false}>
            <div className="modal-header node-props-modal-header">
                <div className="modal-title node-props-title">{title}</div>
                <button type="button" className="btn-close"
                    data-bs-dismiss="modal" aria-label="Закрыть" onClick={onClose} />
            </div>
            <div className="mod-content">{content}</div>
        </Modal>
    );
};

export default FormModal;