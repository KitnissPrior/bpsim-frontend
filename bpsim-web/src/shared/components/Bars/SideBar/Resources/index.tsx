import { MouseEvent, useState } from "react";
import { ShowMoreButton } from "../../../Buttons/ShowMore";
import "../sidebar.css"
import { useSelector } from "react-redux";

interface IProps {
    onContextMenu: (evt: MouseEvent<HTMLDivElement>) => void
    types: any[]
}

export const Resources = ({ onContextMenu, types }: IProps) => {
    const [resTypesVisible, setResTypesVisible] = useState(false);
    const customResources = useSelector((state: any) => state.resource.resources);


    const onShowResTypes = () => {
        setResTypesVisible((prev) => !prev);
    }

    const onShowCustomResources = () => {

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
                            <div className="sidebar-items-slice sidebar-third-slice hoverable" key={index}>
                                <ShowMoreButton onClick={onShowCustomResources} theme="white" />
                                <div className="hoverable" onContextMenu={onContextMenu} onClick={() => { }}>
                                    {type.name}
                                </div>
                            </div>
                            {customResources.map((res: any, index: number) => {
                                if (res.type_id !== type.id) return null
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