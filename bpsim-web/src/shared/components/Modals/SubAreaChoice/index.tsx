import FormModal from "../FormModal";
import { SubjectArea } from "../../../../types/subjectArea";
import { getSubjectAreas } from "../../../../services/subjectArea.service";
import { useEffect, useState } from "react";
import { BaseButton } from "../../Buttons/BaseButton";
import { AxiosError } from "axios";
import TextError from "../../Errors/TextError";
import "./subAreaChoice.css"
import { useDispatch } from "react-redux";
import { setCurrentArea, setDefaultArea } from "../../../../store/reducers/subjectAreaReducer";
import { clearModelItems, setDefaultModel } from "../../../../store/reducers/modelReducer";

interface IProps {
    isOpen: boolean
    onClose: () => void
}


const SubjectAreaChoiceModal = ({ onClose, ...props }: IProps) => {

    const [data, setData] = useState<SubjectArea[]>([]);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDefaultModel());
        dispatch(clearModelItems());
        dispatch(setDefaultArea());
        localStorage.clear();
        getSubjectAreas()
            .then((res: any) => {
                if (res instanceof AxiosError) {
                    setError(res.message);
                }
                else {
                    setData(res.data)
                }
            });

    }, []);

    const onChoiseClick = (item: SubjectArea) => {
        dispatch(setCurrentArea(item))
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Открыть предметную область"}
            content={
                <div>
                    {data.map((item, index) => <div key={index} className="subarea-item"
                        onDoubleClick={() => {
                            localStorage.setItem('subjectAreaId', item.id ? item.id.toString() : "")
                            onChoiseClick(item);
                            onClose();
                        }}>
                        {item.name}
                    </div>)}
                    {error !== '' ?
                        <TextError text={error} />
                        : <>
                            <hr />
                            <div>Всего ПО: {data.length}</div>
                        </>}
                    <BaseButton text="Закрыть" onClick={onClose} />
                </div>

            } className="subarea-open-modal" />)
}

export default SubjectAreaChoiceModal
