import { BaseButton } from "../../Buttons/Base";
import SaveIcon from "../../../../assets/icons/icon_save.svg"
import "./toolbar.css"

type ToolBarItem = {
    name: string;
    onClick?: () => void;
}

interface IProps {
    onSaveClick?: () => void
}

export const Toolbar = (props: IProps) => {
    const toolbarItems: ToolBarItem[] = [
        { name: "Общие", onClick: () => console.log("Общие") },
        { name: "Справочники", onClick: () => console.log("Справочники") },
        { name: "Модель", onClick: () => console.log("Модель") },
        { name: "Проигрывание", onClick: () => console.log("Проигрывание") },
    ]
    return (
        <>
            <div className="toolbar">
                {toolbarItems.map((item, index) => (
                    <div className="toolbar-item" key={index} onClick={item.onClick}>{item.name}</div>
                ))}
                <BaseButton text="Сохранить" onClick={props.onSaveClick} className="toolbar-save-btn"
                    iconPath={SaveIcon} />
            </div>
        </>
    )
}