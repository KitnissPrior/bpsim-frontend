import { BaseButton } from "../../../shared/components/Buttons/BaseButton"
import "./itemsBar.css"

export const ItemsBar = () => {
    return (
        <div className="items-bar">
            <BaseButton className="component" text="Узел" onClick={() => console.log("Создать ПО")} />
            <BaseButton className="component" text="Связь" onClick={() => console.log("Создать ПО")} />
        </div>
    )
}