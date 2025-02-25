import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"

const StartScreen = () => {
    const navigate = useNavigate()

    const onOpenSubjectArea = () => {
        navigate(urls.workField)
    }

    return (
        <>
            <h1>Начните работу прямо сейчас!</h1>
            <button onClick={onOpenSubjectArea}>Создать предметную область</button>
            <button onClick={onOpenSubjectArea}>Открыть предметную область</button>
        </>
    )
}

export default StartScreen