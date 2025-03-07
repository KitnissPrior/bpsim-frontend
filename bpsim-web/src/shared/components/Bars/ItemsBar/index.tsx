import { BaseButton } from "../../Buttons/BaseButton"
import "./itemsBar.css"

interface IProps {
    onNodeAddClick: () => void
    onOpenSubAreaModal: () => void
    onCreateSubAreaModal: () => void
}

export const ItemsBar = (props: IProps) => {

    return (
        <div className="items-bar">
            <BaseButton className="component" text="Открыть ПО" onClick={props.onOpenSubAreaModal} />
            <BaseButton className="component" text="Создать ПО" onClick={props.onCreateSubAreaModal} />
            <BaseButton className="component" text="Узел" onClick={props.onNodeAddClick} />
        </div>
    )
}