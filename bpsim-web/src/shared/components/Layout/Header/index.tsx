import { useNavigate } from "react-router-dom"
import { urls } from "../../../../navigation/app.urls"
import "./header.css"
import { useDispatch, useSelector } from "react-redux"
import { ProjectStatus } from "../../../../enums/projectStatus.enum"
import { setDefaultArea } from "../../../../store/reducers/subjectAreaReducer"

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const currentSubArea = useSelector((state: any) => state.subjectArea.current);
    const projectStatus = useSelector((state: any) => state.subjectArea.status);

    const onStartNavigate = () => {
        dispatch(setDefaultArea());
        navigate(urls.start)
    };

    return (
        <>
            <div className="top-nav" onClick={onStartNavigate}>
                <div className="bpsim">BPsim.MAS</div>
                <div className="bpsim-divider"></div>
                <div className="system text--body-xs">Система имитационного моделирования</div>
                <div className="sub-area-text">
                    {currentSubArea?.name ? `"${currentSubArea.name}"` : ""}
                </div>
                <div className="project-status-text">
                    {projectStatus === ProjectStatus.NONE || projectStatus === ProjectStatus.OPENED ?
                        "" :
                        (projectStatus === ProjectStatus.UNSAVED ? "(есть несохраненные изменения)"
                            : "(сохранено)")}</div>
            </div>
        </>

    )
}

export default Header