import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateNodeDetails } from "../../../../../../services/nodeDetails";
import { NodeDetails } from "../../../../../../types/node";
import { BaseButton } from "../../../../Buttons/Base";
import NumberInput from "../../../../Inputs/Number";
import TextInput from "../../../../Inputs/Text";
import "./mainPage.css"

interface IProps {
    details: any,
    node_id: number,
    onClose: () => void
}

export const MainPage = ({ details, node_id, onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeDetails | any>();

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
        <form className="update-node-details-form" onSubmit={handleSubmit(onDetailsUpdate)}>
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
            <BaseButton text="Сохранить" type="submit" className="modal-save-btn" />
        </form>
    )
}