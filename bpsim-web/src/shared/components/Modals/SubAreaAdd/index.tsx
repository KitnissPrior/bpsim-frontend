import FormModal from "../Form";
import TextInput from "../../Inputs/Text";
import { SubjectArea } from "../../../../types/subjectArea";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../Buttons/Base";
import { createSubjectArea } from "../../../../services/subjectArea.service";
import { AxiosError } from "axios";
import { useState } from "react";
import { setDefaultModel } from "../../../../store/reducers/modelReducer";
import { useDispatch } from "react-redux";
import { setCurrentArea } from "../../../../store/reducers/subjectAreaReducer";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onSubjectAdd?: (number: number) => void
}


const SubjectAreaAddModal = ({ onClose, onSubjectAdd, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<SubjectArea | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubjectAreaSubmit = async (data: SubjectArea) => {
        setLoading(true);
        const response = await createSubjectArea(data);

        if (!(response instanceof AxiosError)) {
            //onSubjectAdd(response.data.length);
            dispatch(setDefaultModel());
            onClose();
            localStorage.setItem('subjectAreaId', response.data.id.toString());
            setLoading(false);
            dispatch(setCurrentArea(response.data));
        }
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создать предметную область"}
            content={
                <form className="px-4 py-3 creation-subject-area-form" onSubmit={handleSubmit(onSubjectAreaSubmit)}>
                    <div>
                        <div className="text--heading3 text-600">Наименование ПО</div>
                        <TextInput placeholder={"Добавьте название"} type="text" id={"name"}
                            register={{ ...register('name', { required: "Введите название ПО" }) }}
                            error={errors.name} />

                    </div>
                    <div>
                        <div className="text--heading3 text-600">Описание ПО</div>
                        <TextInput placeholder="Описание" type="text" id="description"
                            register={{
                                ...register('description',
                                    { maxLength: { value: 255, message: "Максимальная длина 255 символов" } })
                            }}
                            error={errors.description} />
                    </div>
                    <div>
                        <BaseButton text={'Отмена'} onClick={onClose}
                            className="subject-cancel-btn" />
                        <BaseButton type='submit' text={loading ? 'Добавление...' : 'Добавить'}
                        />
                    </div>
                </form>
            } className="subarea-add-modal" />)
}

export default SubjectAreaAddModal
