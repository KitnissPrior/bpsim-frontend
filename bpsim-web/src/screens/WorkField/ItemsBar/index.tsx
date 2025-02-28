import { BaseButton } from "../../../shared/components/Buttons/BaseButton"
import "./itemsBar.css"

interface IProps {
    onNodeAddClick: () => void
}

export const ItemsBar = (props: IProps) => {
    return (
        <div className="items-bar">
            <BaseButton className="component" text="Узел" onClick={props.onNodeAddClick} />
            <BaseButton className="component" text="Связь" onClick={() => console.log("Связь добавлена")} />
        </div>
    )
}