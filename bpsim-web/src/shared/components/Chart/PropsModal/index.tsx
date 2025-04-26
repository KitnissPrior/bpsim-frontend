import { useDispatch, useSelector } from "react-redux"
import { BaseButton } from "../../Buttons/Base"
import TextInput from "../../Inputs/Text"
import FormModal from "../../Modals/Form"
import { useEffect, useState } from "react"
import "./chartProps.css"
import { useForm } from "react-hook-form"
import { Chart, ChartControl } from "../../../../types/chart"
import { addChart } from "../../../../services/chart.service"
import { toast } from "react-toastify"
import { addChart as addChartToState } from "../../../../store/reducers/chartReducer"

interface IProps {
    isOpen: boolean
    onClose: () => void
    onResSelectOpen: () => void
}

export const ChartPropsModal = ({ isOpen, onClose, ...props }: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Chart | any>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const chartName = useSelector((state: any) => state.chart.currentChartName);
    const chartObjectId = useSelector((state: any) => state.chart.currentChartObjectId);
    const chartObjectName = useSelector((state: any) => state.chart.currentChartObjectName);
    const chartX = useSelector((state: any) => state.chart.currentX);
    const chartY = useSelector((state: any) => state.chart.currentY);

    useEffect(() => { }, [chartObjectId]);

    const onSubmit = async (chart: Chart) => {
        const chartControl: ChartControl = {
            ...chart,
            object_id: chartObjectId,
            model_id: Number(localStorage.getItem('modelId')),
            pos_x: chartX, pos_y: chartY,
            width: 300, height: 300
        };

        setLoading(true);
        addChart(chartControl).then((response: any) => {
            if (response.status == 200) {
                toast.success('Диаграмма успешно сохранена');
                dispatch(addChartToState(response.data));
            }
            else {
                toast.error('Диаграмму сохранить не удалось');
            }
            setLoading(false);
            onClose();
        })
    };

    return (
        <FormModal isOpen={isOpen} onClose={onClose} title="Свойства диаграммы" content={
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row-block chart-props-modal-row">
                    <div className="text--body-s">Название диаграммы</div>
                    <TextInput placeholder={""} type={"text"} id={"name"} defaultValue={chartName}
                        register={{
                            ...register('name', {
                                required: "Введите наименование диаграммы",
                                value: chartName,
                                maxLength: { value: 50, message: "Максимальная длина 50 символов" }
                            })
                        }} error={errors.name} />
                </div>
                <div className="row-block chart-props-modal-row">
                    <div className="text--body-s">Привязка к объекту</div>
                    <div className="text--body-xs text-field">{chartObjectName}</div>
                    <BaseButton text="+выбрать" onClick={props.onResSelectOpen} />
                </div>
                {/* <div className="row-block">
                    <div>Подпись по оси Х</div>
                    <TextInput placeholder={""} type={"text"} id={"x-legend"}
                        register={{
                            ...register('x_legend', {
                                required: "Введите подпись по оси Х",
                                value: "Время",
                                minLength: { value: 3, message: "Минимальная длина 3 символа" },
                                maxLength: { value: 50, message: "Максимальная длина 50 символов" }
                            })
                        }} error={errors.x_legend} />
                </div> */}
                <div className="row-block chart-props-modal-row ">
                    <div className="text--body-s">Подпись по оси Y</div>
                    <TextInput placeholder={chartObjectName} type={"text"} id={"y-legend"}
                        defaultValue={chartObjectName}
                        register={{
                            ...register('y_legend', {
                                required: "Введите подпись по оси Y",
                                value: chartObjectName,
                                minLength: { value: 3, message: "Минимальная длина 3 символа" },
                                maxLength: { value: 50, message: "Максимальная длина 50 символов" }
                            })
                        }} error={errors.y_legend} />
                </div>
                <BaseButton text={loading ? "Сохранение..." : "Сохранить"} className="modal-save-btn" type="submit" />
            </form>
        } />
    )
}