import { BaseButton } from "../../Buttons/Base";
import SaveIcon from "../../../../assets/icons/icon_save.svg"
import "./toolbar.css"
import { DropDownButton } from "../../Buttons/DropDown";
import { DropdownProps } from "../../../../types/dropdown";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../../navigation/app.urls";

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

    const toolbarItems: DropdownProps[] = [
        {
            title: "Общие",
            data1: [
                { label: "Создать ПО", onClick: props.onCreateSubArea },
                { label: "Открыть ПО", onClick: props.onOpenSubArea },
                { label: "Сохранить", onClick: props.onSaveClick },
            ],
            data2: [
                { label: "На главный экран", onClick: () => navigate(urls.start) },
            ]
        },
        {
            title: "Справочники",
            data1: [
                { label: "Типы ресурсов", onClick: () => console.log("Типы ресурсов") },
                { label: "Единицы измерения", onClick: () => console.log("Единицы измерения") },
            ],
            data2: [
                { label: "Ресурсы", onClick: () => console.log("Ресурсы") },
            ]
        },
        {
            title: "Модель",
            data1: [
                { label: "Добавить узел", onClick: props.onAddNode },
                { label: "Добавить диаграмму", onClick: props.onAddChart },
            ],
            data2: [
                { label: "Удалить модель", onClick: props.onModelDelete },
            ]
        },
        {
            title: "Проигрывание",
            data1: [
                { label: "Старт", onClick: props.onStartSimulation },
            ],
            data2: [
                { label: "Скачать файл статистики .csv", onClick: () => { } },
                { label: "Скачать файл статистики .xlsx", onClick: () => { } },
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