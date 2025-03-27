import FormModal from "../../Modals/Form";
import TextInput from "../../Inputs/Text";
import { SubjectArea } from "../../../../types/subjectArea";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../Buttons/Base";
import { useEffect, useState } from "react";
import { Resource, ResourceType } from "../../../../types/resource";
import NumberInput from "../../Inputs/Number";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createResource } from "../../../../services/resource.service";
import { Select } from "../../Inputs/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentResTypeId } from "../../../../store/reducers/resourceRedicer";
import { setCurrentMeasureId } from "../../../../store/reducers/measureReducer";
import { current } from "@reduxjs/toolkit";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onResourceSave?: (number: number) => void
    types: any[];
    measures: any[];
}


const ResourceForm = ({ onClose, onResourceSave, ...props }: IProps) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Resource | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const typeId = useSelector((state: any) => state.resource.currentTypeId);
    const measureId = useSelector((state: any) => state.measure.currentId);

    const onResourceSubmit = async (data: Resource) => {
        setLoading(true);
        data.type_id = typeId;
        data.measure_id = measureId;
        data.sub_area_id = Number(localStorage.getItem('subjectAreaId'));
        console.log(data);

        const response = await createResource(data);

        if (!(response instanceof AxiosError)) {
            toast.success('Ресурс успешно добавлен');
            setLoading(false);
            reset();
            onClose();
        }
        else {
            toast.error('При добавлении ресурса произошла ошибка');
        }

    }

    const onTypeSelect = (typeId: string) => {
        dispatch(setCurrentResTypeId(Number(typeId)));
    }

    const onMeasureSelect = (measureId: any) => {
        dispatch(setCurrentMeasureId(Number(measureId)));
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создание ресурса"}
            content={
                <form className="px-4 py-3 creation-resource-form" onSubmit={handleSubmit(onResourceSubmit)}
                >
                    <div className="row-block">
                        <div className="text--heading3 text-600">Тип</div>
                        <Select title="Тип" data={props.types} onSelect={onTypeSelect} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Наименование</div>
                        <TextInput placeholder={"Ресурс1"} type="text" id={"name"}
                            register={{ ...register('name', { required: "Введите наименование ресурса", value: "Ресурс1" }) }}
                            error={errors.name} />

                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Текущее значение</div>
                        <NumberInput placeholder="0,00" id="current_value"
                            register={{
                                ...register('current_value', { value: "0,0" })
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Максимальное значение</div>
                        <NumberInput placeholder="0,00" id="max_value"
                            register={{
                                ...register('max_value', { value: "0,0" })
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Минимальное значение</div>
                        <NumberInput placeholder="0,00" id="min_value"
                            register={{
                                ...register('min_value', { value: "0,0" })
                            }}
                            error={errors.description} />
                    </div>
                    <div className="row-block">
                        <div className="text--heading3 text-600">Ед. изм</div>
                        <Select data={props.measures} title="Единица измерения" onSelect={onMeasureSelect} />
                    </div>
                    <div className="row-block">
                        <BaseButton text={'Отмена'} onClick={onClose}
                            className="subject-cancel-btn" />
                        <BaseButton type='submit' text={loading ? 'Добавление...' : 'Добавить'}
                        />
                    </div>
                </form>
            } className="resource-add-modal" />)
}

export default ResourceForm
