import FormModal from "../../Modals/Form";
import TextInput from "../../Inputs/Text";
import { SubjectArea } from "../../../../types/subjectArea";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../Buttons/Base";
import { AxiosError } from "axios";
import { useState } from "react";
import { Resource } from "../../../../types/resource";
import NumberInput from "../../Inputs/Number";


interface IProps {
    isOpen: boolean
    onClose: () => void
    onResourceSave?: (number: number) => void
}


const ResourceForm = ({ onClose, onResourceSave, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<SubjectArea | any>();
    const [loading, setLoading] = useState(false);

    const onResourceSubmit = async (data: Resource) => {
        setLoading(true);

    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создание ресурса"}
            content={
                <form className="px-4 py-3 creation-resource-form" onSubmit={handleSubmit(onResourceSubmit)}>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Тип</div>
                        <TextInput placeholder={"Добавьте тип"} type="text" id={"type_id"}
                            register={{ ...register('type_id', { required: "Введите тип" }) }}
                            error={errors.type} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Наименование</div>
                        <TextInput placeholder={"Ресурс1"} type="text" id={"name"}
                            register={{ ...register('name', { required: "Введите наименование ресурса" }) }}
                            error={errors.name} />

                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Текущее значение</div>
                        <NumberInput placeholder="0,00" id="current_value"
                            register={{
                                ...register('current_value',)
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Минимальное значение</div>
                        <NumberInput placeholder="0,00" id="min_value"
                            register={{
                                ...register('min_value',)
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Максимальное значение</div>
                        <NumberInput placeholder="0,00" id="max_value"
                            register={{
                                ...register('max_value',)
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <BaseButton text={'Отмена'} onClick={onClose}
                            className="subject-cancel-btn" />
                        <BaseButton type='submit' text={loading ? 'Добавление...' : 'Добавить'}
                        />
                    </div>
                </form>
            } className="subarea-add-modal" />)
}

export default ResourceForm
