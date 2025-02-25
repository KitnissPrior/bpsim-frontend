import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"
import "./start.css"

const StartScreen = () => {
    const navigate = useNavigate()

    const onOpenSubjectArea = () => {
        navigate(urls.workField)
    }

    return (
        <div className="start-screen">
            <h2>Начните работу прямо сейчас!</h2>
            <div className="buttons-area">
                <button onClick={onOpenSubjectArea}>Создать ПО</button>
                <button onClick={onOpenSubjectArea}>Открыть ПО</button>
            </div>
        </div>
    )
}

export default StartScreen