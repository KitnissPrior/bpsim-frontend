import FormModal from "../../Modals/Form";
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
import TextError from "../../Errors/TextError";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onSubjectAdd?: (number: number) => void
}


const SubjectAreaAddModal = ({ onClose, onSubjectAdd, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<SubjectArea | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const onSubjectAreaSubmit = async (data: SubjectArea) => {
        setLoading(true);
        setError('');
        const response = await createSubjectArea(data);

        if (!(response instanceof AxiosError)) {
            dispatch(setDefaultModel());
            onClose();
            localStorage.setItem('subjectAreaId', response.data.id.toString());
            setLoading(false);
            dispatch(setCurrentArea(response.data));
        }
        else {
            setLoading(false);
            const error = response.response as any;
            setError(error.data.detail);
        }
    }

    const onFormFocus = () => {
        setError('');
        setLoading(false);
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создать предметную область"} onClose={onClose}
            content={
                <form className="px-4 py-3 creation-subject-area-form" onSubmit={handleSubmit(onSubjectAreaSubmit)} onFocus={onFormFocus}>
                    <div className="modal-row">
                        <div className="text--body-s modal-field-name">Наименование ПО</div>
                        <TextInput placeholder={"Название"} type="text" id={"name"}
                            register={{
                                ...register('name', {
                                    required: "Введите название ПО"
                                }),
                                minLength: { value: 3, message: "Минимальная длина 3 символа" },
                                maxLength: { value: 50, message: "Максимальная длина 50 символов" },
                            }}
                            error={errors.name} />

                    </div>
                    <div className="modal-row">
                        <div className="text--body-s modal-field-name">Описание ПО</div>
                        <TextInput placeholder="Описание" type="text" id="description"
                            register={{
                                ...register('description',
                                    {
                                        maxLength: { value: 255, message: "Максимальная длина 255 символов" }
                                    })
                            }}
                            error={errors.description} />
                    </div>
                    <TextError text={error} />
                    <BaseButton type='submit' className="modal-save-btn"
                        text={loading ? 'Создание...' : 'Создать'} />
                </form>
            } className="subarea-add-modal" />)
}

export default SubjectAreaAddModal
