import { Modal } from "react-bootstrap"
import TextInput from "../../../Inputs/TextInput"
import "./propsModal.css"
import { useEffect, useRef } from "react"
import { BaseButton } from "../../../Buttons/BaseButton"
import { NodeDetails } from "../../../../../types/nodeDetails"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getNodeDetails, updateNodeDetails } from "../../../../../services/nodeDetails"
import { AxiosError } from "axios"
import { useState } from "react"

interface IProps {
    className?: string
    isOpen: boolean
    name: string
    node_id: number
    onClose: () => void
}

export const NodePropsModal = ({ isOpen, name, node_id, className, onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeDetails | any>();
    const [details, setDetails] = useState<NodeDetails>({ id: 0, node_id: 0, duration: "", cost: 0 });
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            getNodeDetails(node_id).then((response: any) => {
                if (!(response instanceof AxiosError)) {
                    setDetails(response.data);
                }
            })
        }
    }, []);

    const onDetailsUpdate = (data: NodeDetails) => {
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
            <div className="mod-header">{`Редактирование узла "` + name + `"`}</div>
            <div className="mod-content">
                <form className="px-4 py-3 update-node-details-form" onSubmit={handleSubmit(onDetailsUpdate)}>
                    <div className="props-modal-block">
                        <div>Наименование</div>
                        <TextInput placeholder={"Добавьте наименование"}
                            register={{ ...register('name', { required: "Добавьте наименование узла" }) }}
                            error={errors.name}
                            type="text" id={"name"}
                            defaultValue={name} disabled={false} />
                    </div>
                    <div className="props-modal-block">
                        <div>Время операции</div>
                        <TextInput placeholder={"Добавьте время операции"}
                            defaultValue={details.duration}
                            type="text" id={"duration"} disabled={false}
                            register={{ ...register('duration', { required: "Добавьте время операции" }) }}
                            error={errors.duration}
                        />
                    </div>
                    <div className="props-modal-block">
                        <div>Стоимость</div>
                        <input type="number" placeholder={"Добавьте стоимость"} defaultValue={details.cost} onChange={(e) => { details.cost = Number(e.target.value) }} />
                    </div>
                    <BaseButton text="Применить" type="submit" className="props-modal-save-btn" />
                    <BaseButton text="Закрыть" onClick={onClose} className="props-modal-close-btn" />
                </form>
            </div>
        </Modal>
    )
}