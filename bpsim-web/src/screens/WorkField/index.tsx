import Toolbar from "../../shared/components/Bars/Toolbar"
import { ItemsBar } from "../../shared/components/Bars/ItemsBar"
import "./workField.css"
import { createNode, getNodes } from "../../services/node.service"
import { defaultNode } from "../../types/node"
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from "react"
import { Node } from "../../types/node"
import { updateNode } from "../../services/node.service"
import { BpsimNode } from "../../shared/components/BpsimNode"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import SubjectAreaAddModal from "../../shared/components/Modals/SubAreaAdd"
import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"
import { getSubjectArea } from "../../services/subjectArea.service"
import { setCurrentArea } from "../../store/reducers/subjectAreaReducer"
import SubjectAreaChoiceModal from "../../shared/components/Modals/SubAreaChoice"
import { getModels } from "../../services/model.service"
import { Model } from "../../types/model"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentModel, setModelItems } from "../../store/reducers/modelReducer"
import { setBpsimItems, setGraphicItems } from "../../store/reducers/nodeReducer"

interface INode {
    key: string | number;
    id: string;
    data: {
        label: string;
    }
    position: {
        x: number;
        y: number;
    }
    type: string;
}

const nodeTypes = { textNode: BpsimNode };

interface IProps {
    isOpenSubAreaModal?: boolean
    isCreateSubAreaModal?: boolean
}

const WorkFieldScreen = ({ isCreateSubAreaModal = false, isOpenSubAreaModal = false }: IProps) => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);
    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "step" }];
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const currentSubjectArea = useSelector((state: any) => state.subjectArea.current);

    const [nodes, setNodes] = useState<INode[]>([]);
    const [edges, setEdges] = useState(initialEdges);
    //const [subjectArea, setSubjectArea] = useState<SubjectArea>({} as SubjectArea);

    //const [models, setModels] = useState<Model[]>([]);
    const models = useSelector((state: any) => state.model.items);
    const currentModel = useSelector((state: any) => state.model.current);
    const mathNodes = useSelector((state: any) => state.node.bpsimItems);

    const [showNewSubAreaModal, setShowNewSubAreaModal] = useState(isCreateSubAreaModal);
    const [showOpenSubAreaModal, setShowOpenSubAreaModal] = useState(isOpenSubAreaModal);

    const memoizedOnNodesChange = useCallback((changes: any) => {
        setNodes((nds) => {
            const updatedNodes = applyNodeChanges(changes, nds);
            setBpsimNodes(prevNodes => {
                return prevNodes.map(node => {
                    const updatedNode = updatedNodes.find(n => n.id == node.id);
                    return updatedNode ? {
                        ...node,
                        name: updatedNode.data?.label,
                        posX: updatedNode.position?.x,
                        posY: updatedNode.position?.y,
                    } : node;
                });
            });
            return updatedNodes;
        });
        //dispatch(setBpsimItems(bpsimNodes))
    }, []);

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({ ...params, type: 'step' }, eds)),
        [],
    );

    const onModelChoose = (model: Model) => {
        dispatch(setCurrentModel(model));

        const modelId = Number(model.id)
        getNodes(modelId).then((response: any) => {
            const data = response.data;
            setNodesCount(data.length);

            setBpsimNodes(data);
            dispatch(setBpsimItems(data))
            dispatch(setGraphicItems(data))


            const newNodes: any = [];
            data.forEach((node: any) => {
                newNodes.push({
                    key: node.id.toString(),
                    id: node.id.toString(),
                    position: { x: node.posX, y: node.posY },
                    data: { label: node.name },
                    sourcePosition: "right",
                    targetPosition: "left",
                    type: 'textNode'
                });
            });
            setNodes(newNodes);
        })
    }


    useEffect(() => {

        if (localStorage.getItem('subjectAreaId') && !isCreateSubAreaModal && !isOpenSubAreaModal) {
            getSubjectArea(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                dispatch(setCurrentArea(response.data));
            });

            getModels(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                if (response instanceof AxiosError) {
                    toast.error('Модели не загрузились');
                }
                else {
                    dispatch(setModelItems(response.data));

                    if (models.length > 0) {
                        getNodes(currentModel.id).then((response: any) => {
                            setNodesCount(response.data.length);

                            const nodes = response.data;
                            setBpsimNodes(nodes);
                            const newNodes: any = [];
                            nodes.forEach((node: any) => {
                                newNodes.push({
                                    key: node.id.toString(),
                                    id: node.id.toString(),
                                    position: { x: node.posX, y: node.posY },
                                    data: { label: node.name },
                                    sourcePosition: "right",
                                    targetPosition: "left",
                                    type: 'textNode'
                                });
                            });
                            setNodes(newNodes);
                        })
                    }

                }
            })



        }

    }, [nodesCount, localStorage.getItem('subjectAreaId'), isCreateSubAreaModal, isOpenSubAreaModal]);


    const onNodeAddClick = () => {
        defaultNode.model_id = currentModel.id;
        createNode(defaultNode)
            .then((response: any) => {
                const createdNode = response.data;
                console.log(createdNode);
                setBpsimNodes(prevNodes => [...prevNodes, createdNode]);
                setNodesCount(prev => prev + 1);
            })
    }

    const onSaveClick = () => {
        const errors = [];
        bpsimNodes.forEach((node: any) => {
            updateNode(node).catch((error: AxiosError) => {
                errors.push(error);
            });
        })
        errors.length == 0 ? toast.success('Данные сохранены') : toast.error('Данные сохранить не удалось');
    }

    const onSubAreaModalCreateClose = () => {
        setShowNewSubAreaModal(false);
        navigate(urls.workField);
    }

    const onSubAreaModalChoiceClose = () => {
        setShowOpenSubAreaModal(false);
        navigate(urls.workField);
    }

    const onOpenSubAreaModal = () => {
        navigate(urls.subjectAreaOpen);
        setShowOpenSubAreaModal(true);
    }

    const onCreateSubAreaModal = () => {
        navigate(urls.subjectAreaCreate);
        setShowNewSubAreaModal(true);
    }

    return (
        <div className="work-field">
            <Toolbar onSaveClick={onSaveClick} />
            <ItemsBar onNodeAddClick={onNodeAddClick} onCreateSubAreaModal={onCreateSubAreaModal} onOpenSubAreaModal={onOpenSubAreaModal} />
            <div className="work-field-main">
                <div className="sidebar">
                    <div> {currentSubjectArea ? currentSubjectArea.name : "ПО не выбрана"}</div>
                    <div className="text-600">Модели</div>
                    {models.map((model: any) => {
                        const name = `${model.name}` + (model.id == currentModel?.id ? '*' : '');
                        return (
                            <div style={{ paddingLeft: '10px' }} key={model.id} onClick={() => onModelChoose(model)}
                            >{name}</div>
                        )
                    })}
                </div>
                <div className="vertical-line"></div>
                <div className="work-field-content">
                    <ReactFlow nodes={nodes} edges={edges}
                        onNodesChange={memoizedOnNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
                <SubjectAreaAddModal isOpen={showNewSubAreaModal} onClose={onSubAreaModalCreateClose} />
                <SubjectAreaChoiceModal isOpen={showOpenSubAreaModal} onClose={onSubAreaModalChoiceClose} />
            </div>
        </div>
    )
}

export default WorkFieldScreen