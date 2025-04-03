import FormModal from "../../Modals/Form";
import { SubjectArea } from "../../../../types/subjectArea";
import { getSubjectAreas } from "../../../../services/subjectArea.service";
import { useEffect, useState } from "react";
import { BaseButton } from "../../Buttons/Base";
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
    const [chosenArea, setChosenArea] = useState<SubjectArea>();
    const dispatch = useDispatch();

    useEffect(() => {

        //dispatch(setDefaultArea());
        //localStorage.clear();
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

    const onSubAreaClick = (item: SubjectArea) => {
        setChosenArea(item);
        setError('')
    }

    const onChoiseClick = () => {
        if (!chosenArea) {
            setError('Выберите предметную область');
            return;
        }
        dispatch(setDefaultModel());
        dispatch(clearModelItems());
        dispatch(setCurrentArea(chosenArea))
        localStorage.setItem('subjectAreaId', chosenArea.id ? chosenArea.id.toString() : "")
        onClose();
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Открыть предметную область"} onClose={onClose}
            content={
                <div>
                    {data.map((item, index) => <div key={index} className="subarea-item"
                        onClick={() => onSubAreaClick(item)}>
                        {item.name}
                    </div>)}
                    {error !== '' ?
                        <TextError text={error} />
                        : <>
                            <hr />
                            <div>Всего ПО: {data.length}</div>
                        </>}
                    <BaseButton text="Выбрать" onClick={onChoiseClick} className="modal-save-btn" />
                </div>

            } className="subarea-open-modal" />)
}

export default SubjectAreaChoiceModal
