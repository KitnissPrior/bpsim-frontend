import { useNavigate } from "react-router-dom"
import { urls } from "../../../../navigation/app.urls"
import "./header.css"

const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="top-nav" onClick={() => navigate(urls.start)}>
                <div className="bpsim">BPsim.MAS</div>
                <div className="bpsim-divider"></div>
                <div className="system text--body-xs">Система имитационного моделирования</div>
                <div></div>
            </div>
        </>

    )
}

export default Header