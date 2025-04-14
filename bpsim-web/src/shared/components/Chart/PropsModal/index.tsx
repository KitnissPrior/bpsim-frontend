import { useSelector } from "react-redux"
import { BaseButton } from "../../Buttons/Base"
import TextInput from "../../Inputs/Text"
import FormModal from "../../Modals/Form"
import { useEffect } from "react"
import "./chartProps.css"

interface IProps {
    isOpen: boolean
    onClose: () => void
    onResSelectOpen: () => void
}

export const ChartPropsModal = ({ isOpen, onClose, ...props }: IProps) => {
    const chartName = useSelector((state: any) => state.chart.currentChartName);
    const chartObjectName = useSelector((state: any) => state.chart.currentChartObjectName);

    useEffect(() => { }, [chartObjectName]);

    const onSubmit = () => { };

    return (
        <FormModal isOpen={isOpen} onClose={onClose} title="Свойства диаграммы" content={
            <form>
                <div className="row-block">
                    <div>Название диаграммы</div>
                    <TextInput placeholder={""} type={"text"} id={"name"} defaultValue={chartName} />
                </div>
                <div className="row-block">
                    <div>Привязка к объекту</div>
                    <div className="text--body-xs text-field">{chartObjectName}</div>
                    <BaseButton text="выбрать" onClick={props.onResSelectOpen} />
                </div>
                <div className="row-block">
                    <div>Подпись по оси Х</div>
                    <TextInput placeholder={""} type={"text"} id={"axis-legend"} />
                </div>
                <div className="row-block">
                    <div>Подпись по оси Y</div>
                    <TextInput placeholder={""} type={"text"} id={"oxis-legend"} register={{}} />
                </div>
                <BaseButton text="Сохранить" onClick={onClose} className="modal-save-btn" />
            </form>
        } />
    )
}