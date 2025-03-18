import { MouseEvent, useState } from "react";
import { ShowMoreButton } from "../../../Buttons/ShowMore";
import "../sidebar.css"

interface IProps {
    onContextMenu: (evt: MouseEvent<HTMLDivElement>) => void
    data: any[]
}

export const Resources = ({ onContextMenu, }: IProps) => {
    const [dataVisible, setDataVisible] = useState(false);

    return (
        <>

            <div className="sidebar-items-slice sidebar-second-slice">
                <ShowMoreButton onClick={() => setDataVisible((prev) => !prev)} theme="secondary" />
                <div className="text-600" onContextMenu={onContextMenu}>
                    Ресурсы
                </div>
            </div>
            {dataVisible &&
                <>
                    <div className="sidebar-third-slice">Информационный</div>
                    <div className="sidebar-third-slice">Материальный</div>
                    <div className="sidebar-third-slice">Трудовой</div>
                    <div className="sidebar-third-slice">Финансовый</div>
                </>}
        </>
    )
}