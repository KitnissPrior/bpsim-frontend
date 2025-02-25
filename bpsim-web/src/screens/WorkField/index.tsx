import Toolbar from "../../shared/components/Toolbar"
import "./workField.css"
import { BaseButton } from "../../shared/components/Buttons/BaseButton"

const WorkFieldScreen = () => {
    return (
        <div className="work-field">
            <Toolbar />
            <div className="work-field-main">
                <div className="sidebar">
                    <BaseButton text="Создать ПО" onClick={() => console.log("Создать ПО")} />
                    <BaseButton text="Открыть ПО" onClick={() => console.log("Открыть ПО")} />
                </div>
                <div className="vertical-line"></div>
                <div className="work-field-content">
                    Моделируйте модельки и симулируйте вашу скучную жизн
                </div>

            </div>

        </div>
    )
}

export default WorkFieldScreen