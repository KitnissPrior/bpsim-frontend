import Toolbar from "../../shared/Toolbar"
import "./workField.css"

const WorkFieldScreen = () => {
    return (
        <div className="work-field">
            <div className="toolbar-field">
                <Toolbar />
            </div>
            <div className="work-field-main">
                <div className="sidebar">
                    <button>Создать ПО</button>
                    <button>Открыть ПО</button>
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