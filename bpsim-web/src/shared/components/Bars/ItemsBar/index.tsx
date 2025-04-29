import { IconButton } from "../../Buttons/Icon"
import "./itemsBar.css"
import SubAreaCreate from "../../../../assets/icons/sub_area_create.svg"
import SubAreaOpen from "../../../../assets/icons/sub_area_open.svg"
import NodeAdd from "../../../../assets/icons/icon_node.svg"
import Play from "../../../../assets/icons/play.svg"
import Coursor from "../../../../assets/icons/icon_coursor.svg"
// import Agent from "../../../../assets/icons/icon_agent.svg"
// import Checkbox from "../../../../assets/icons/icon_checkbox.svg"
// import Radio from "../../../../assets/icons/icon_radio.svg"
// import Slider from "../../../../assets/icons/icon_slider.svg"
import Diagram from "../../../../assets/icons/icon_diagram.svg"
import { useSelector } from "react-redux"
// import Text from "../../../../assets/icons/icon_text.svg"

interface IProps {
    onOpenSubAreaModal: () => void
    onCreateSubAreaModal: () => void
    onStart: () => void
    onNodeAddClick: () => void
    onChartAddClick: () => void
}

export const ItemsBar = (props: IProps) => {
    const currentModel = useSelector((state: any) => state.model.current);
    const nodes = useSelector((state: any) => state.node.bpsimItems);

    return (
        <>
            <div className="items-horizontal-line" />
            <div className="items-bar-background">
                <div className="items-bar">
                    <IconButton iconPath={SubAreaOpen} iconClassName="icon"
                        onClick={props.onOpenSubAreaModal} placeholder="Открыть ПО (предметную область)" />
                    <IconButton iconPath={SubAreaCreate} iconClassName="icon"
                        onClick={props.onCreateSubAreaModal} placeholder="Создать ПО (предметную область)" />
                    <div className="items-bar-divider" />
                    <IconButton iconPath={Play} disabled={nodes.length === 0} iconClassName="icon"
                        onClick={props.onStart} placeholder="Старт" />
                    <div className="items-bar-divider" />
                    {/* <IconButton iconPath={Coursor} disabled={!currentModel} iconClassName="icon" placeholder="Курсор" /> */}
                    <IconButton iconPath={NodeAdd} disabled={!currentModel} iconClassName="icon"
                        onClick={props.onNodeAddClick} placeholder="Узел" />
                    {/* <IconButton iconPath={Agent} iconClassName="icon" placeholder="Агент" />
            <IconButton iconPath={Checkbox} iconClassName="icon" placeholder="Чекбокс" />
            <IconButton iconPath={Radio} iconClassName="icon" placeholder="Радиогруппа" />
            <IconButton iconPath={Slider} iconClassName="icon" placeholder="Бегунок" /> */}
                    <IconButton iconPath={Diagram} disabled={!currentModel} iconClassName="icon" placeholder="Диаграмма"
                        onClick={props.onChartAddClick} />
                    {/* <IconButton iconPath={Text} iconClassName="icon" placeholder="Текст" /> */}
                </div>
            </div>
            <div className="items-horizontal-line" />
        </>
    )
}