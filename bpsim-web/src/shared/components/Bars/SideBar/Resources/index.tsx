import { MouseEvent, useState } from "react";
import { ShowMoreButton } from "../../../Buttons/ShowMore";
import "../sidebar.css"
import { useDispatch, useSelector } from "react-redux";
import { addVisibleResId, deleteVisibleResId, deleteResource as deleteStoreResource } from "../../../../../store/reducers/resourceRedicer"
import ResourceAddForm from "../../../Resources/Add";
import { ContextAdd } from "../../../ContextMenu/Add";
import "./res.css"
import ConfirmModal from "../../../Modals/Confirm";
import { CustomResourceContext } from "../../../Resources/Context";
import { deleteResource } from "../../../../../services/resource.service";
import { toast } from "react-toastify";
import { Resource } from "../../../../../types/resource";

interface IProps {
    types: any[]
    measures: any[]
}

export const Resources = ({ types, measures }: IProps) => {
    const [resTypesVisible, setResTypesVisible] = useState(false);
    const [addContextVisible, setAddContextVisible] = useState(false);
    const [customContextVisible, setCustomContextVisible] = useState(false);
    const [resourceFormVisible, setResourceFormVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [selectedRes, setSelectedRes] = useState<Resource>();
    const dispatch = useDispatch();

    const customResources = useSelector((state: any) => state.resource.resources);
    const visibleTypeIds = useSelector((state: any) => state.resource.visibleTypeIds);

    const onResoursesRightClick = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setAddContextVisible((prev) => !prev);
    }

    const onShowResourceForm = () => {
        setResourceFormVisible(true);
        setAddContextVisible(false);
    }

    const onShowResTypes = () => {
        setResTypesVisible((prev) => !prev);
    }

    const onShowCustomResources = (id: number) => {
        if (visibleTypeIds.includes(id))
            dispatch(deleteVisibleResId(id));
        // else if (customResources.find((item: Resource) => item.type_id === id)) 
        else
            dispatch(addVisibleResId(id));
    }

    const onShowDeleteConfirm = () => {
        setCustomContextVisible(false);
        setDeleteConfirmVisible(true);
    }

    const onConfirmClose = () => {
        setDeleteConfirmVisible(false);
    }

    const onCustomResAdd = () => {
        setCustomContextVisible(false);
        onShowResourceForm();
    }

    const onCustomResDelete = () => {
        setCustomContextVisible(false);
        if (!selectedRes?.id) return;
        deleteResource(selectedRes.id).then((response: any) => {
            if (response.status == 200) {
                dispatch(deleteStoreResource(selectedRes.id));
                toast.success('Ресурс успешно удален')
                console.log(customResources);
            }
            else {
                toast.error(`${response.message}`)
            }
            setDeleteConfirmVisible(false);
        })
    }

    return (
        <>
            <div className="sidebar-items-slice sidebar-second-slice hoverable">
                <ShowMoreButton onClick={onShowResTypes} theme="secondary" />
                <div className="hoverable" onContextMenu={onResoursesRightClick} onClick={onShowResTypes}>
                    Ресурсы
                </div>
            </div>
            {addContextVisible &&
                <ContextAdd className="resource-context-add"
                    text="+ Добавить ресурс"
                    onAdd={onShowResourceForm} />}
            {resTypesVisible &&
                <>
                    {types.map((type, index) => (
                        <div key={index + type.name}>
                            <div className={`sidebar-items-slice sidebar-third-slice hoverable`
                                /*${visibleTypeIds.includes(type.id) ? "hoverable" : ""} */
                            }
                                onClick={() => onShowCustomResources(type.id)} key={index}>
                                <ShowMoreButton theme="white" />
                                <div onContextMenu={onResoursesRightClick}>
                                    {type.name}
                                </div>
                            </div>
                            {customResources.map((res: any, index: number) => {
                                if (res.type_id !== type.id || !visibleTypeIds.includes(type.id)) return null
                                return (
                                    <div className="sidebar-items-slice sidebar-fourth-slice hoverable"

                                        onClick={() => {
                                            setSelectedRes(res);
                                            setCustomContextVisible((prev) => !prev)
                                        }}
                                        key={index}>
                                        <ShowMoreButton disabled={true} theme="black" />
                                        <div className="hoverable">
                                            {res.name}
                                        </div>
                                    </div>
                                )
                            })}
                            {customContextVisible &&
                                <CustomResourceContext onAdd={onCustomResAdd}
                                    onDelete={onShowDeleteConfirm} />}
                        </div>
                    ))}
                </>}
            <ResourceAddForm isOpen={resourceFormVisible}
                onClose={() => setResourceFormVisible(false)}
                types={types} measures={measures} />
            <ConfirmModal
                isOpen={deleteConfirmVisible}
                onCancel={onConfirmClose}
                onOk={onCustomResDelete}
                content={`Вы уверены что хотите удалить ресурс '${selectedRes?.name}'?`}
                okText="Удалить" />
        </>
    )
}