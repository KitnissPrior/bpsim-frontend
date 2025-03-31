import { useForm } from "react-hook-form"
import { NodeRes } from "../../../../../../types/node"
import { BaseButton } from "../../../../Buttons/Base"
import { Table } from "../../../../Table"
import "./resPage.css"

interface IProps {
    node_id: number
    onClose: () => void
}

export const ResPage = ({ node_id, onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeRes[] | any>();

    const onResourcesSave = (data: NodeRes[]) => {

    }
    return (
        <form onSubmit={handleSubmit(onResourcesSave)}>
            <div className="node-res-props-grid">
                <div className="text--body-xs node-res-title">Условия запуска / ресурсы на входе</div>
                <div className="text--body-xs node-res-title">Ресурсы на выходе</div>
                <Table data={[]} headers={["Ресурс", "Формула"]} />
                <Table data={[]} headers={["Ресурс", "Формула"]} />
            </div>
            <BaseButton onClick={onClose} text="Сохранить" />
        </form>
    )
}