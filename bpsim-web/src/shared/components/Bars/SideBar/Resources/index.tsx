import { MouseEvent, useState } from "react";
import { ShowMoreButton } from "../../../Buttons/ShowMore";
import "../sidebar.css"
import { useDispatch, useSelector } from "react-redux";
import { addVisibleResId, deleteVisibleResId } from "../../../../../store/reducers/resourceRedicer"

interface IProps {
    onContextMenu: (evt: MouseEvent<HTMLDivElement>) => void
    types: any[]
}

export const Resources = ({ onContextMenu, types }: IProps) => {
    const [resTypesVisible, setResTypesVisible] = useState(false);
    const customResources = useSelector((state: any) => state.resource.resources);
    const visibleTypeIds = useSelector((state: any) => state.resource.visibleTypeIds);
    const dispatch = useDispatch();

    const onShowResTypes = () => {
        setResTypesVisible((prev) => !prev);
    }

    const onShowCustomResources = (id: number) => {
        if (visibleTypeIds.includes(id))
            dispatch(deleteVisibleResId(id));
        else
            dispatch(addVisibleResId(id));
    }

    return (
        <>
            <div className="sidebar-items-slice sidebar-second-slice hoverable">
                <ShowMoreButton onClick={onShowResTypes} theme="secondary" />
                <div className="hoverable" onContextMenu={onContextMenu} onClick={onShowResTypes}>
                    Ресурсы
                </div>
            </div>
            {resTypesVisible &&
                <>
                    {types.map((type, index) => (
                        <div key={index + type.name}>
                            <div className={`sidebar-items-slice sidebar-third-slice 
                            ${visibleTypeIds.includes(type.id) ? "hoverable" : ""}`}
                                onClick={() => onShowCustomResources(type.id)} key={index}>
                                <ShowMoreButton theme="white" />
                                <div onContextMenu={onContextMenu}>
                                    {type.name}
                                </div>
                            </div>
                            {customResources.map((res: any, index: number) => {
                                if (res.type_id !== type.id || !visibleTypeIds.includes(type.id)) return null
                                return (
                                    <div className="sidebar-items-slice sidebar-fourth-slice hoverable" key={index}>
                                        <ShowMoreButton disabled={true} theme="black" />
                                        <div className="hoverable" onContextMenu={onContextMenu} onClick={() => { }}
                                        >
                                            {res.name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </>}
        </>
    )
}