import { BaseButton } from "../../Buttons/Base";
import SaveIcon from "../../../../assets/icons/icon_save.svg"
import "./toolbar.css"
import { DropDownButton } from "../../Buttons/DropDown";
import { DropdownProps } from "../../../../types/dropdown";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../../navigation/app.urls";
import { useSelector } from "react-redux";

interface IProps {
    onSaveClick: () => void
    onCreateSubArea: () => void
    onOpenSubArea: () => void
    onAddNode: () => void
    onAddChart: () => void
    onModelDelete: () => void
    onStartSimulation: () => void
}

export const Toolbar = (props: IProps) => {
    const navigate = useNavigate();

    const currentModel = useSelector((state: any) => state.model.current);
    const tableForExport = useSelector((state: any) => state.chart.tableForExport);
    const nodes = useSelector((state: any) => state.node.bpsimItems);

    const toolbarItems: DropdownProps[] = [
        {
            title: "Общие",
            data1: [
                { label: "Создать ПО", onClick: props.onCreateSubArea },
                { label: "Открыть ПО", onClick: props.onOpenSubArea },
                {
                    label: "Сохранить", onClick: props.onSaveClick, disabled: !currentModel
                },
            ],
            data2: [
                { label: "На главный экран", onClick: () => navigate(urls.start) },
            ]
        },
        {
            title: "Справочники",
            data1: [
                { label: "Типы ресурсов", onClick: () => console.log("Типы ресурсов"), disabled: true },
                { label: "Единицы измерения", onClick: () => console.log("Единицы измерения"), disabled: true },
            ],
            data2: [
                { label: "Ресурсы", onClick: () => console.log("Ресурсы"), disabled: true },
            ]
        },
        {
            title: "Модель",
            data1: [
                { label: "Добавить узел", onClick: props.onAddNode, disabled: !currentModel },
                { label: "Добавить диаграмму", onClick: props.onAddChart, disabled: !currentModel },
            ],
            data2: [
                { label: "Удалить модель", onClick: props.onModelDelete, disabled: true },
            ]
        },
        {
            title: "Проигрывание",
            data1: [
                { label: "Старт", onClick: props.onStartSimulation, disabled: !nodes },
            ],
            data2: [
                {
                    label: "Скачать файл статистики .csv", onClick: () => { },
                    disabled: tableForExport.length === 0
                },
                {
                    label: "Скачать файл статистики .xlsx", onClick: () => { },
                    disabled: tableForExport.length === 0
                },
            ]
        },
    ]
    return (
        <>
            <div className="toolbar">
                {toolbarItems.map((item, index) => (
                    <DropDownButton key={index} title={item.title} data1={item.data1} data2={item.data2} />
                ))}
                <BaseButton text="Сохранить" onClick={props.onSaveClick} className="toolbar-save-btn"
                    iconPath={SaveIcon} />
            </div>
        </>
    )
}