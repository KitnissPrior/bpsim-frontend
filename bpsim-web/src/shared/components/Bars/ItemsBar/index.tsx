import { BaseButton } from "../../Buttons/BaseButton"
import "./itemsBar.css"

interface IProps {
    onNodeAddClick: () => void
}

export const ItemsBar = (props: IProps) => {
    return (
        <div className="items-bar">
            <BaseButton className="component" text="Узел" onClick={props.onNodeAddClick} />
        </div>
    )
}