import { useState, MouseEvent, Key } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Model } from "../../../../types/model";
import ModelAddForm from "../../Model/Add";
import "./sidebar.css"
import { ContextAdd } from "../../ContextMenu/Add";
import { ModelProps } from "../../Model/ContextProps";
import { deleteModel } from "../../../../services/model.service";
import { deleteModel as deleteStoreModel, setCurrentModel } from "../../../../store/reducers/modelReducer";
import ConfirmModal from "../../Modals/Confirm";
import { toast } from "react-toastify";
import { Resources } from "./Resources";
import { ShowMoreButton } from "../../Buttons/ShowMore";

interface IProps {
    onModelChoose: (model: Model) => void
}

export const SideBar = ({ onModelChoose }: IProps) => {
    const [modelContextVisible, setModelContextVisible] = useState(false);
    const [modelFormVisible, setModelFormVisible] = useState(false);
    const [propsVisible, setPropsVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [modelsVisible, setModelsVisible] = useState(false);
    const dispatch = useDispatch()

    const currentSubjectArea = useSelector((state: any) => state.subjectArea.current);
    const models = useSelector((state: any) => state.model.items);
    const currentModel = useSelector((state: any) => state.model.current);
    const measures = useSelector((state: any) => state.measure.items);
    const resTypes = useSelector((state: any) => state.resource.types);

    const onModelsRightClick = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setModelContextVisible((prev) => !prev);
    }

    const onShowModelProps = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setPropsVisible(true);
    }

    const onModelDelete = () => {
        const id = currentModel.id;
        deleteModel(currentModel.id).then((response: any) => {
            if (response.status == 200) {
                dispatch(deleteStoreModel(id));
                localStorage.removeItem('modelId');
                toast.success('Модель успешно удалена')
            }
            else {
                toast.error(`${response.message}`)
            }
            setDeleteConfirmVisible(false)
        })

    }

    const onShowModels = () => {
        setModelsVisible((prev) => !prev);
    }

    return (
        <>
            <div className="sidebar" key="sidebar">
                <div className="sidebar-items-slice">
                    <ShowMoreButton disabled={true} theme="primary" />
                    <div key="sub-area-name"> {currentSubjectArea ? currentSubjectArea.name : "ПО не выбрана"}</div>
                </div>
                {currentSubjectArea &&
                    <div className="sidebar-items-slice sidebar-second-slice hoverable">
                        <ShowMoreButton onClick={onShowModels} theme="secondary" />
                        <div className="hoverable"
                            onClick={onShowModels}
                            onContextMenu={onModelsRightClick}>Модели</div>
                    </div>
                }
                {modelContextVisible &&
                    <ContextAdd
                        text="+ Добавить модель"
                        onAdd={() => {
                            setModelFormVisible(true)
                            setModelContextVisible(false)
                        }} />}
                {modelsVisible && models.map((model: any, index: Key) => {
                    return (
                        <div className="sidebar-items-slice sidebar-third-slice" key={index}>
                            <ShowMoreButton disabled={true} theme="white" />
                            <div key={model.id}
                                onClick={() => onModelChoose(model)}
                                onContextMenu={(evt) => {
                                    dispatch(setCurrentModel(model))
                                    onShowModelProps(evt)
                                }}>
                                {`${model.name}` + (model.id == currentModel?.id ? '*' : '')}
                            </div>
                        </div>
                    )
                })}
                {currentSubjectArea && <Resources types={resTypes} measures={measures} />}
                {
                    propsVisible && <ModelProps
                        onClose={() => setPropsVisible(false)}
                        onDelete={
                            () => {
                                setDeleteConfirmVisible(true)
                                setPropsVisible(false)
                            }
                        } />
                }
            </div >
            <ModelAddForm isOpen={modelFormVisible}
                onClose={() => {
                    setModelFormVisible(false)
                    setModelContextVisible(false);
                }} />
            {
                deleteConfirmVisible &&
                <ConfirmModal
                    isOpen={deleteConfirmVisible}
                    onCancel={() => {
                        setDeleteConfirmVisible(false);
                        setPropsVisible(false)
                    }}
                    onOk={onModelDelete}
                    content={"Вы уверены что хотите удалить модель?"}
                    okText="Удалить" />
            }
        </>
    )
}