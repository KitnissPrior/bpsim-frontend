import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"
import { BaseButton } from "../../shared/components/Buttons/Base"
import "./start.css"
import Footer from "../../shared/components/Layout/Footer"

const StartScreen = () => {
    const navigate = useNavigate()

    const onOpenSubjectArea = () => {
        navigate(urls.subjectAreaOpen);
    }

    const onCreateSubjectArea = () => {
        navigate(urls.subjectAreaCreate);
    }

    return (
        <div className="start-screen">
            <div className="text--heading1 text--center">Начните работу прямо сейчас!</div>
            <div className="buttons-area">
                <BaseButton text="Открыть предметную область" onClick={onOpenSubjectArea} />
                <BaseButton text="Создать предметную область" onClick={onCreateSubjectArea} />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default StartScreen