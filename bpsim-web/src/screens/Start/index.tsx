import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"
import { BaseButton } from "../../shared/components/Buttons/BaseButton"
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
                <BaseButton text="Открыть ПО" onClick={onOpenSubjectArea} />
                <BaseButton text="Создать ПО" onClick={onOpenSubjectArea} />
            </div>
        </div>
    )
}

export default StartScreen