import FormModal from "../../Modals/Form";
import TextInput from "../../Inputs/Text";
import { set, useForm } from "react-hook-form";
import { BaseButton } from "../../Buttons/Base";
import { AxiosError } from "axios";
import { useState } from "react";
import { addModel, setCurrentModel, } from "../../../../store/reducers/modelReducer";
import { useDispatch } from "react-redux";
import { createModel } from "../../../../services/model.service"
import { Model } from "../../../../types/model";
import { toast } from "react-toastify";
import TextError from "../../Errors/TextError";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onModelAdd?: (number: number) => void
}


const ModelAddForm = ({ onClose, onModelAdd: onSubjectAdd, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Model | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const subjectAreaId = Number(localStorage.getItem('subjectAreaId'));
    const [error, setError] = useState('');

    const onModelSubmit = async (data: Model) => {
        setLoading(true);
        if (!subjectAreaId) {
            throw new Error('Subject area id is not defined');
        }
        const response = await createModel(data, subjectAreaId);

        if (!(response instanceof AxiosError)) {
            reset();
            onClose();
            localStorage.setItem('modelId', response.data.id.toString());
            toast.success('Модель успешно добавлена');
            setLoading(false);
            dispatch(setCurrentModel(response.data));
            dispatch(addModel(response.data));
        }
        else {
            setLoading(false);
            const error = response.response as any;
            setError(error.data.detail);
        }
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создание модели"} onClose={onClose}
            content={
                <form className="px-4 py-3 creation-model-form" onSubmit={handleSubmit(onModelSubmit)}
                    onFocus={() => setError('')}>
                    <div className="modal-row">
                        <div className="text--body-s modal-field-name">Наименование модели</div>
                        <TextInput placeholder={"Наименование"} type="text" id={"name"}
                            register={{
                                ...register('name', {
                                    required: "Введите наименование модели",
                                    value: " ",
                                    maxLength: { value: 50, message: "Максимальная длина 50 символов" }
                                })
                            }} error={errors.name} />
                    </div>
                    <div className="modal-row">
                        <div className="text--body-s modal-field-name">Описание модели</div>
                        <TextInput placeholder="Описание" type="text" id="description"
                            register={{
                                ...register('description', {
                                    value: " ",
                                    maxLength: { value: 255, message: "Максимальная длина 255 символов" }
                                })
                            }}
                            error={errors.description} />
                    </div>
                    <TextError text={error} />
                    <BaseButton type='submit' text={loading ? 'Добавление...' : 'Добавить'}
                        className="modal-save-btn" />
                </form >
            } className="model-add-form" />)
}

export default ModelAddForm
