import { MouseEvent, useState } from "react";
import { ShowMoreButton } from "../../../Buttons/ShowMore";
import "../sidebar.css"

interface IProps {
    onContextMenu: (evt: MouseEvent<HTMLDivElement>) => void
    data: any[]
}

export const Resources = ({ onContextMenu, }: IProps) => {
    const [dataVisible, setDataVisible] = useState(false);

    const onShowResources = () => {
        setDataVisible((prev) => !prev);
    }

    return (
        <>

            <div className="sidebar-items-slice sidebar-second-slice hoverable">
                <ShowMoreButton onClick={onShowResources} theme="secondary" />
                <div className="hoverable" onContextMenu={onContextMenu} onClick={onShowResources}>
                    Ресурсы
                </div>
            </div>
            {dataVisible &&
                <>
                    <div className="sidebar-items-slice sidebar-third-slice">
                        <ShowMoreButton disabled={true} theme="white" />
                        <div>Информационный</div>
                    </div>
                    <div className="sidebar-items-slice sidebar-third-slice">
                        <ShowMoreButton disabled={true} theme="white" />
                        <div>Материальный</div>
                    </div>
                    <div className="sidebar-items-slice sidebar-third-slice">
                        <ShowMoreButton disabled={true} theme="white" />
                        <div>Трудовой</div>
                    </div>
                    <div className="sidebar-items-slice sidebar-third-slice">
                        <ShowMoreButton disabled={true} theme="white" />
                        <div>Финансовый</div>
                    </div>
                </>}
        </>
    )
}