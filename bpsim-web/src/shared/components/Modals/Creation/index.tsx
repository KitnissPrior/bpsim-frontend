import "./creationModal.css"
import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    id?: string;
    isOpen: boolean;
    title?: string;
    content: React.ReactNode;
    className?: string
}

const CreationModal: React.FC<IProps> = (
    { isOpen, title, content, className }) => {

    const modalRef = React.useRef(null);

    return (
        <Modal show={isOpen} ref={modalRef} className={className ? className : ""}
            keyboard={false} backdrop='static' enforceFocus={false}>
            <div className="mod-content">
                <div className="">
                    {title}
                </div>
                {content}
            </div>
        </Modal>
    );
};

export default CreationModal;