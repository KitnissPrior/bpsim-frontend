import { useForm } from "react-hook-form"
import { NodeRes } from "../../../../../../types/node"
import { BaseButton } from "../../../../Buttons/Base"
import { Table } from "../../../../Table"
import "./resPage.css"
import { ResourceSelectModal } from "../ResSelect"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getResources } from "../../../../../../services/resource.service"
import { setResources } from "../../../../../../store/reducers/resourceRedicer"

interface IProps {
    node_id: number
    onClose: () => void
}

export const ResPage = ({ node_id, onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeRes[] | any>();
    const [resSelectVisible, setResSelectVisible] = useState(false);
    const dispatch = useDispatch();

    const resources = useSelector((state: any) => state.resource.resources);

    const onResourcesSave = (data: NodeRes[]) => { }

    const onSelectModalOpen = () => {
        if (resources.length === 0)
            getResources(Number(localStorage.getItem('subjectAreaId')))
                .then((response: any) => {
                    if (response.status === 200) {
                        dispatch(setResources(response.data));

                    }
                    console.log(response.data);
                });
        setResSelectVisible(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onResourcesSave)} className="res-settings-container">
                <div className="node-res-props-grid">
                    <div className="text--body-xs node-res-title">Условия запуска / ресурсы на входе</div>
                    <div className="text--body-xs node-res-title">Ресурсы на выходе</div>
                    <Table data={[]} headers={["Ресурс", "Формула"]} onAdd={onSelectModalOpen} />
                    <Table data={[]} headers={["Ресурс", "Формула"]} onAdd={onSelectModalOpen} />
                </div>
                <BaseButton onClick={onClose} text="Сохранить" className="modal-save-btn" />
            </form>
            <ResourceSelectModal onClose={() => setResSelectVisible(false)} isOpen={resSelectVisible}
                data={resources} />
        </>
    )
}