import "./accept-modal.css"
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { BaseButton } from "../../Buttons/Base";

interface ModalProps {
    id?: string;
    isOpen: boolean;
    onOk: () => void;
    onCancel?: () => void;
    okText: string;
    cancelText?: string;
    title?: string;
    content: React.ReactNode;
}

const ConfirmModal: React.FC<ModalProps> = (
    { isOpen, onCancel, onOk, content, okText, cancelText }) => {

    const bsModalRef = React.useRef(null);

    return (
        <>
            <Modal show={isOpen} onHide={onCancel} ref={bsModalRef}
                keyboard={false} backdrop='static' enforceFocus={false} className="mod-container">
                <div className="modal-content">
                    <div className="mod-text text--body-m text-600 text--blue">
                        {content}
                    </div>
                    <div className="mod-footer">
                        <BaseButton text={cancelText ? cancelText : "Отмена"} onClick={onCancel} />
                        <BaseButton text={okText} onClick={onOk} />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ConfirmModal;
