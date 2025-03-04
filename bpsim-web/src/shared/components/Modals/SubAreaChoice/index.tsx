import FormModal from "../FormModal";
import { SubjectArea } from "../../../../types/subjectArea";
import { getSubjectAreas } from "../../../../services/subjectArea.service";
import { useEffect, useState } from "react";
import { BaseButton } from "../../Buttons/BaseButton";
import { AxiosError } from "axios";
import TextError from "../../Errors/TextError";
import "./subAreaChoice.css"

interface IProps {
    isOpen: boolean
    onClose: () => void
}


const SubjectAreaChoiceModal = ({ onClose, ...props }: IProps) => {

    const [data, setData] = useState<SubjectArea[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
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

    return (
        <FormModal isOpen={props.isOpen} title={"Открыть предметную область"}
            content={
                <div>
                    {data.map((item, index) => <div key={index} className="subarea-item"
                        onDoubleClick={() => {
                            localStorage.setItem('subjectAreaId', item.id ? item.id.toString() : "")
                            onClose();
                        }}>
                        {item.name}
                    </div>)}
                    {error.length == 0 ? <TextError text={error} /> : <div>Всего ПО: {data.length}</div>}
                    <BaseButton text="Закрыть" onClick={onClose} />
                </div>

            } className="subarea-open-modal" />)
}

export default SubjectAreaChoiceModal
