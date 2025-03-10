import { Modal } from "react-bootstrap"
import TextInput from "../../../Inputs/TextInput"
import "./propsModal.css"
import { useRef, useState } from "react"
import { BaseButton } from "../../../Buttons/BaseButton"

interface IProps {
    className?: string
    isOpen: boolean
    name: string
    onSubmit?: () => void
    onClose?: () => void
}

export const NodePropsModal = ({ isOpen, name, className, ...props }: IProps) => {
    const [cost, setCost] = useState(0.00);
    const modalRef = useRef(null);

    return (
        <Modal show={isOpen} ref={modalRef} className={"props-modal " + className}
            keyboard={false} backdrop='static' enforceFocus={false}>
            <div className="mod-header">{`Редактирование узла "` + name + `"`}</div>
            <div className="mod-content">

            </div>
            <div className="props-modal-block">
                <div>Наименование</div>
                <TextInput placeholder={"Добавьте наименование"}
                    type="text" id={"name"}
                    defaultValue={name} disabled={false} />
            </div>
            <div className="props-modal-block">
                <div>Время операции</div>
                <TextInput placeholder={"Добавьте время операции"}
                    type="text" id={"duration"} disabled={false}
                />
            </div>
            <div className="props-modal-block">
                <div>Стоимость</div>
                <input type="number" placeholder={"Добавьте стоимость"} defaultValue={cost} onChange={(e) => { setCost(+e.target.value) }} />
            </div>
            <BaseButton text="Закрыть" onClick={props.onClose} className="props-modal-close-btn" />
        </Modal>
    )
}