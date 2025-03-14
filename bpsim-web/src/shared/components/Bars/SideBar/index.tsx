import { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Model } from "../../../../types/model";
import ModelAddForm from "../../Modals/ModelAdd";
import { ModelContextMenu } from "../../Model/ContextAdd";
import { ModelProps } from "../../Model/ContextProps";
import { deleteModel } from "../../../../services/model.service";
import { deleteModel as deleteStoreModel, setCurrentModel } from "../../../../store/reducers/modelReducer";
import ConfirmModal from "../../Modals/Confirm";
import { toast } from "react-toastify";

interface IProps {
    onModelChoose: (model: Model) => void
}

export const SideBar = ({ onModelChoose }: IProps) => {
    const [modelContextVisible, setModelContextVisible] = useState(false);
    const [modelFormVisible, setModelFormVisible] = useState(false);
    const [propsVisible, setPropsVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const dispatch = useDispatch()

    const currentSubjectArea = useSelector((state: any) => state.subjectArea.current);
    const models = useSelector((state: any) => state.model.items);
    const currentModel = useSelector((state: any) => state.model.current);

    const onModelsRightClick = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setModelContextVisible((prev) => !prev);
    }

    const onShowModelProps = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setPropsVisible(true);
    }

    const onModelDelete = () => {
        //const id = Number(localStorage.getItem('modelId'));
        const id = currentModel.id;
        deleteModel(currentModel.id).then((response: any) => {
            if (response.status == 200) {
                dispatch(deleteStoreModel(id));
                localStorage.removeItem('modelId');
                setDeleteConfirmVisible(false)
                toast.success('Модель успешно удалена')
            }
            else {
                toast.error(`${response.message}`)
            }
        })

    }

    return (
        <>
            <div className="sidebar">
                <div key="sub-area-name"> {currentSubjectArea ? currentSubjectArea.name : "ПО не выбрана"}</div>
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
                    return (<div style={{ zIndex: '1', }}>
                        <div style={{ paddingLeft: '20px' }} key={model.id}
                            onClick={() => onModelChoose(model)}
                            onContextMenu={(evt) => {
                                dispatch(setCurrentModel(model))
                                //localStorage.setItem('')
                                onShowModelProps(evt)
                            }}>
                            {`${model.name}` + (model.id == currentModel?.id ? '*' : '')}
                        </div>
                    </div>)
                })}
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