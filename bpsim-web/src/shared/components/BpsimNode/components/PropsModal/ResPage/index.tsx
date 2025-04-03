import { useForm } from "react-hook-form"
import { NodeRes } from "../../../../../../types/node"
import { BaseButton } from "../../../../Buttons/Base"
import { Table } from "../../../../Table"
import "./resPage.css"
import { ResourceSelectModal } from "../ResSelect"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getResources } from "../../../../../../services/resource.service"
import { setResources } from "../../../../../../store/reducers/resourceRedicer"
import { ResFormulaModal } from "../FormulaModal"
import { TableType } from "../../../../../../enums/tableType.enum"
import { setResInOut } from "../../../../../../store/reducers/nodeResReducer"
import { NodeResType } from "../../../../../../types/resource"

interface IProps {
    onClose: () => void
}

export const ResPage = ({ onClose }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NodeRes[] | any>();
    const [resSelectVisible, setResSelectVisible] = useState(false);
    const [resFormulaVisible, setResFormulaVisible] = useState(false);
    const [resourcesOut, setResourcesOut] = useState([]);
    const [resourcesIn, setResourcesIn] = useState([]);
    const dispatch = useDispatch();

    const resources = useSelector((state: any) => state.resource.resources);
    const nodeResources = useSelector((state: any) => state.nodeRes.resources);

    useEffect(() => {
        if (nodeResources.length > 0) {
            setResourcesIn(nodeResources.filter((res: NodeRes) => res.res_in_out === NodeResType.IN));
            setResourcesOut(nodeResources.filter((res: NodeRes) => res.res_in_out === NodeResType.OUT));
        }
    }, [])

    const onResourcesSave = (data: NodeRes[]) => {

    }

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

    const onFormulaModalOpen = () => {
        setResFormulaVisible(true);
    }
    const onFormulaModalClose = () => {
        setResFormulaVisible(false);
    }

    const onResInAdd = () => {
        dispatch(setResInOut(NodeResType.IN));
        onSelectModalOpen();
    }

    const onResOutAdd = () => {
        dispatch(setResInOut(NodeResType.OUT));
        onSelectModalOpen();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onResourcesSave)} className="res-settings-container">
                <div className="node-res-props-grid">
                    <div className="text--body-xs node-res-title">Условия запуска / ресурсы на входе</div>
                    <div className="text--body-xs node-res-title">Ресурсы на выходе</div>
                    <Table data={resourcesIn} headers={["Ресурс", "Формула"]} onAdd={onResInAdd}
                        type={TableType.SelectAdd} />
                    <Table data={resourcesOut} headers={["Ресурс", "Формула"]} onAdd={onResOutAdd}
                        type={TableType.SelectAdd} />
                </div>
                <BaseButton onClick={onClose} text="Сохранить" className="modal-save-btn" />
            </form>
            <ResourceSelectModal onClose={() => setResSelectVisible(false)} isOpen={resSelectVisible}
                data={resources} onSave={onFormulaModalOpen} />
            <ResFormulaModal isOpen={resFormulaVisible} onClose={onFormulaModalClose} data={resources} />
        </>
    )
}