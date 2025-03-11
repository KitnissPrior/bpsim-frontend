import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux"
import { Model } from "../../../../types/model";
import ModelAddForm from "../../Modals/ModelAdd";
import { ModelContextMenu } from "../../Model/ModelContextMenu";

interface IProps {
    onModelChoose: (model: Model) => void
}

export const SideBar = ({ onModelChoose }: IProps) => {
    const [modelContextVisible, setModelContextVisible] = useState(false);
    const [modelFormVisible, setModelFormVisible] = useState(false);

    const currentSubjectArea = useSelector((state: any) => state.subjectArea.current);
    const models = useSelector((state: any) => state.model.items);
    const currentModel = useSelector((state: any) => state.model.current);

    const onModelsRightClick = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setModelContextVisible((prev) => !prev);
    }


    return (
        <>
            <div className="sidebar">
                <div> {currentSubjectArea ? currentSubjectArea.name : "ПО не выбрана"}</div>
                {currentSubjectArea &&
                    <div className="text-600" style={{ paddingLeft: '10px' }}
                        onContextMenu={onModelsRightClick}>Модели</div>
                }
                {modelContextVisible &&
                    <ModelContextMenu
                        onModelAdd={() => {
                            setModelFormVisible(true)
                            setModelContextVisible(false)
                        }} />}
                {models.map((model: any) => {
                    const name = `${model.name}` + (model.id == currentModel?.id ? '*' : '');
                    return (
                        <div style={{ paddingLeft: '20px' }} key={model.id} onClick={() => onModelChoose(model)}
                        >{name}</div>
                    )
                })}
            </div>
            <ModelAddForm isOpen={modelFormVisible}
                onClose={() => {
                    setModelFormVisible(false)
                    setModelContextVisible(false);
                }} /></>
    )
}