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
import { addResource, setCurrentResTypeId } from "../../../../store/reducers/resourceRedicer";
import { setCurrentMeasureId } from "../../../../store/reducers/measureReducer";
import { resourceSchema } from "../../../hooks/validation/resAddForm";
import { yupResolver } from '@hookform/resolvers/yup';
import TextError from "../../Errors/TextError";

interface IProps {
    isOpen: boolean
    onClose: () => void
    onResourceSave?: (number: number) => void
    types: any[];
    measures: any[];
}


const ResourceAddForm = ({ onClose, onResourceSave, ...props }: IProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Resource | any>({
        resolver: yupResolver(resourceSchema)
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const typeId = useSelector((state: any) => state.resource.currentTypeId);
    const measureId = useSelector((state: any) => state.measure.currentId);

    const [selectTypeError, setSelectTypeError] = useState("");
    const [selectMeasureError, setSelectMeasureError] = useState("");

    const onResourceSubmit = async (data: Resource) => {
        setLoading(true);
        if (!typeId) {
            setSelectTypeError("Выберите тип ресурса");
            setLoading(false);
            return;
        }
        else
            setSelectTypeError("");
        if (!measureId) {
            setSelectMeasureError("Выберите единицу измерения");
            setLoading(false);
            return;
        }
        else
            setSelectMeasureError("");
        data.type_id = typeId;
        data.measure_id = measureId;
        data.sub_area_id = Number(localStorage.getItem('subjectAreaId'));

        const response = await createResource(data);

        if (!(response instanceof AxiosError)) {
            toast.success('Ресурс успешно добавлен');
            setLoading(false);
            dispatch(addResource(response.data));
            dispatch(setCurrentResTypeId(undefined));
            dispatch(setCurrentMeasureId(undefined));
            setSelectTypeError("");
            setSelectMeasureError("");
            reset();
            onClose();
        }
        else {
            setLoading(false);
            const error = response.response as any;
            setError(error.data.detail);
        }

    }

    const onTypeSelect = (typeId: string) => {
        dispatch(setCurrentResTypeId(Number(typeId)));
    }

    const onMeasureSelect = (measureId: any) => {
        dispatch(setCurrentMeasureId(Number(measureId)));
    }

    return (
        <FormModal isOpen={props.isOpen} title={"Создание ресурса"} onClose={onClose}
            content={
                <form className="px-4 py-3 creation-resource-form" onSubmit={handleSubmit(onResourceSubmit)}
                >
                    <div className="row-block">
                        <div className="text--body-s">Тип</div>
                        <Select title="Тип" data={props.types} onSelect={onTypeSelect}
                            error={selectTypeError}
                        />
                    </div>
                    <div className="row-block">
                        <div className="text--body-s">Наименование</div>
                        <TextInput placeholder={"Ресурс1"} type="text" id={"name"}
                            register={{ ...register('name', { value: "Ресурс1" }) }}
                            error={errors.name} />

                    </div>
                    <div className="row-block">
                        <div className="text--body-s">Текущее значение</div>
                        <NumberInput placeholder="0,000" id="current_value"
                            register={{
                                ...register('current_value', { value: 0.000 })
                            }}
                            error={errors.current_value} />
                    </div>
                    <div className="row-block">
                        <div className="text--body-s">Максимальное значение</div>
                        <NumberInput placeholder="0,000" id="max_value"
                            register={{
                                ...register('max_value', { value: 0.000 })
                            }}
                            error={errors.max_value} />
                    </div>
                    <div className="row-block">
                        <div className="text--body-s">Минимальное значение</div>
                        <NumberInput placeholder="0,000" id="min_value"
                            register={{
                                ...register('min_value', { value: 0.000 })
                            }}
                            error={errors.min_value} />
                    </div>
                    <div className="row-block">
                        <div className="text--body-s">Ед. измерения</div>
                        <Select data={props.measures} title="Единица измерения" onSelect={onMeasureSelect}
                            error={selectMeasureError} />
                    </div>
                    <TextError text={error} />
                    <BaseButton type='submit' className="modal-save-btn"
                        text={loading ? 'Создание...' : 'Создать'} />
                </form>
            } className="resource-add-modal" />)
}

export default ResourceAddForm
