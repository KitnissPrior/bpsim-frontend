import FormModal from "../Form";
import TextInput from "../../Inputs/Text";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../Buttons/BaseButton";
import { AxiosError } from "axios";
import { useState } from "react";
import { addModel, setCurrentModel, } from "../../../../store/reducers/modelReducer";
import { useDispatch, useSelector } from "react-redux";
import { createModel } from "../../../../services/model.service"
import { Model } from "../../../../types/model";
import { toast } from "react-toastify";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onModelAdd?: (number: number) => void
}


const ModelAddForm = ({ onClose, onModelAdd: onSubjectAdd, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Model | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const subjectAreaId = Number(localStorage.getItem('subjectAreaId'));

    const onModelSubmit = async (data: Model) => {
        setLoading(true);
        if (!subjectAreaId) {
            throw new Error('Subject area id is not defined');
        }
        const response = await createModel(data, subjectAreaId);

        if (!(response instanceof AxiosError)) {
            //onSubjectAdd(response.data.length);
            onClose();
            toast.success('Модель успешно добавлена');
            setLoading(false);
            dispatch(setCurrentModel(response.data));
            dispatch(addModel(response.data));
        }
        else {
            toast.error('При добавлении модели произошла ошибка');
        }
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создание модели"}
            content={
                <form className="px-4 py-3 creation-model-form" onSubmit={handleSubmit(onModelSubmit)}>
                    <div className="">
                        <div className="text--heading3 text-600">Наименование модели</div>
                        <TextInput placeholder={"Добавьте название"} type="text" id={"name"}
                            register={{
                                ...register('name', {
                                    required: "Введите название модели",
                                    maxLength: { value: 20, message: "Максимальная длина 20 символов" }
                                })
                            }} error={errors.name} />
                    </div>
                    <div>
                        <div className="text--heading3 text-600">Описание модели</div>
                        <TextInput placeholder="Описание" type="text" id="description"
                            register={{
                                ...register('description',
                                    { maxLength: { value: 255, message: "Максимальная длина 255 символов" } })
                            }}
                            error={errors.description} />
                    </div>
                    <div className="">
                        <BaseButton text={'Отмена'} onClick={onClose}
                            className="subject-cancel-btn" />
                        <BaseButton type='submit' text={loading ? 'Добавление...' : 'Добавить'}
                        />
                    </div>
                </form>
            } className="model-add-form" />)
}

export default ModelAddForm
