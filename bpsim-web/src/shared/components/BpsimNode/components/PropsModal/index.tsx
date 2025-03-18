import { Modal } from "react-bootstrap"
import TextInput from "../../../Inputs/Text"
import NumberInput from "../../../Inputs/Number"
import "./propsModal.css"
import { useEffect, useRef } from "react"
import { BaseButton } from "../../../Buttons/Base"
import { NodeDetails } from "../../../../../types/nodeDetails"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { updateNodeDetails } from "../../../../../services/nodeDetails"
import { AxiosError } from "axios"

interface IProps {
    className?: string
    isOpen: boolean
    node_id: number
    details: any
    onClose: () => void
}

export const NodePropsModal = ({ isOpen, node_id, className, details, onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeDetails | any>();
    useEffect(() => { })
    const modalRef = useRef(null);

    const onDetailsUpdate = (data: NodeDetails) => {
        data.node_id = node_id;
        updateNodeDetails(data, details.id).then((response) => {
            if (!(response instanceof AxiosError)) {
                toast.success("Данные успешно обновлены");
                onClose()
            }
            else {
                toast.error("Данные обновить не удалось");
            }
        })
    }

    return (
        <Modal show={isOpen} ref={modalRef} className={"props-modal " + className}
            keyboard={false} backdrop='static' enforceFocus={false}>
            <div className="mod-header">{`Редактирование узла "` + details.name + `"`}</div>
            <div className="mod-content">
                <form className="px-4 py-3 update-node-details-form" onSubmit={handleSubmit(onDetailsUpdate)}>
                    <div className="props-modal-block">
                        <div>Наименование</div>
                        <TextInput placeholder={"Добавьте наименование"}
                            register={{ ...register('name', { required: "Добавьте наименование узла" }) }}
                            error={errors.name}
                            type="text" id={"name"}
                            defaultValue={details.name} disabled={true} />
                    </div>
                    <div className="props-modal-block">
                        <div>Время операции</div>
                        <TextInput placeholder={"Добавьте время операции"}
                            type="text" id={"duration"} disabled={false}
                            defaultValue={details.duration}
                            register={{ ...register('duration', { required: "Добавьте время операции" }) }}
                            error={errors.duration}
                        />
                    </div>
                    <div className="props-modal-block">
                        <div>Стоимость</div>
                        <NumberInput placeholder={"Добавьте стоимость"}
                            defaultValue={details.cost}
                            id="cost" disabled={false}
                            register={{ ...register('cost') }}
                            error={errors.cost}
                        />
                    </div>
                    <BaseButton text="Применить" type="submit" className="props-modal-save-btn" />
                    <BaseButton text="Закрыть" onClick={onClose} className="props-modal-close-btn" />
                </form>
            </div>
        </Modal>
    )
}