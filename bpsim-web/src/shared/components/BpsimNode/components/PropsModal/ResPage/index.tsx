import { useForm } from "react-hook-form"
import { NodeRes } from "../../../../../../types/node"
import { BaseButton } from "../../../../Buttons/Base"
import { Table } from "../../../../Table"
import "./resPage.css"
import { ResourceSelectModal } from "../ResSelect"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ResFormulaModal } from "../FormulaModal"
import { TableType } from "../../../../../../enums/tableType.enum"
import { clearNewResources, setResInOut } from "../../../../../../store/reducers/nodeResReducer"
import { NodeResType, Resource } from "../../../../../../types/resource"
import { toast } from "react-toastify"
import { createNodeRes } from "../../../../../../services/nodeDetails"

interface IProps {
    onClose: () => void
}

export const ResPage = ({ onClose }: IProps) => {
    const { handleSubmit } = useForm<NodeRes[] | any>();
    const [resSelectVisible, setResSelectVisible] = useState(false);
    const [resFormulaVisible, setResFormulaVisible] = useState(false);
    const dispatch = useDispatch();

    const resources = useSelector((state: any) => state.resource.resources);
    const tableResourcesIn = useSelector((state: any) => state.nodeRes.tableResourcesIn);
    const tableResourcesOut = useSelector((state: any) => state.nodeRes.tableResourcesOut);
    const newResources = useSelector((state: any) => state.nodeRes.newResources);

    const onResourcesSave = () => {
        const errors = [];

        newResources.forEach((res: Resource) => {
            createNodeRes(res).then((response: any) => {
                if (response.status !== 200) errors.push(response);
            })
        })

        if (errors.length > 0) {
            onClose();
            toast.error("Ошибка сохранения ресурсов");
            return;
        }
        onClose();
        dispatch(clearNewResources());
        toast.success("Ресурсы сохранены");
    }

    const onSelectModalOpen = () => {
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
                    <Table data={tableResourcesIn} headers={["Ресурс", "Формула"]} onAdd={onResInAdd}
                        type={TableType.SelectAdd} />
                    <Table data={tableResourcesOut} headers={["Ресурс", "Формула"]} onAdd={onResOutAdd}
                        type={TableType.SelectAdd} />
                </div>
                <BaseButton type="submit" text="Сохранить" className="modal-save-btn" />
            </form>
            <ResourceSelectModal onClose={() => setResSelectVisible(false)} isOpen={resSelectVisible}
                data={resources} onSelect={onFormulaModalOpen} />
            <ResFormulaModal isOpen={resFormulaVisible} onClose={onFormulaModalClose} data={resources} />
        </>
    )
}