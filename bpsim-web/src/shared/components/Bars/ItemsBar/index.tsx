import { IconButton } from "../../Buttons/IconButton"
import "./itemsBar.css"
import SubAreaCreate from "../../../../assets/icons/sub_area_create.svg"
import SubAreaOpen from "../../../../assets/icons/sub_area_open.svg"
import NodeAdd from "../../../../assets/icons/icon_node.svg"
import Play from "../../../../assets/icons/play.svg"
import Stop from "../../../../assets/icons/stop.svg"
import Coursor from "../../../../assets/icons/icon_coursor.svg"
import Agent from "../../../../assets/icons/icon_agent.svg"
import Checkbox from "../../../../assets/icons/icon_checkbox.svg"
import Radio from "../../../../assets/icons/icon_radio.svg"
import Slider from "../../../../assets/icons/icon_slider.svg"
import Diagram from "../../../../assets/icons/icon_diagram.svg"
import Text from "../../../../assets/icons/icon_text.svg"

interface IProps {
    onNodeAddClick: () => void
    onOpenSubAreaModal: () => void
    onCreateSubAreaModal: () => void
}

export const ItemsBar = (props: IProps) => {

    return (
        <div className="items-bar">
            <IconButton iconPath={SubAreaOpen} iconClassName="icon"
                onClick={props.onOpenSubAreaModal} placeholder="Открыть ПО (предметную область)" />
            <IconButton iconPath={SubAreaCreate} iconClassName="icon"
                onClick={props.onCreateSubAreaModal} placeholder="Создать ПО (предметную область)" />
            <div className="items-bar-divider" />
            <IconButton iconPath={Play} iconClassName="icon" placeholder="Старт" />
            <IconButton iconPath={Stop} iconClassName="icon" placeholder="Стоп" />
            <div className="items-bar-divider" />
            <IconButton iconPath={Coursor} iconClassName="icon" placeholder="Курсор" />
            <IconButton iconPath={NodeAdd} iconClassName="icon"
                onClick={props.onNodeAddClick} placeholder="Узел" />
            <IconButton iconPath={Agent} iconClassName="icon" placeholder="Агент" />
            <IconButton iconPath={Checkbox} iconClassName="icon" placeholder="Чекбокс" />
            <IconButton iconPath={Radio} iconClassName="icon" placeholder="Радиогруппа" />
            <IconButton iconPath={Slider} iconClassName="icon" placeholder="бегунок" />
            <IconButton iconPath={Diagram} iconClassName="icon" placeholder="Диаграмма" />
            <IconButton iconPath={Text} iconClassName="icon" placeholder="Текст" />
        </div>
    )
}