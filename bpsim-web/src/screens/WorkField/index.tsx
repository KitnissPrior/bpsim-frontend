import { Toolbar } from "../../shared/components/Bars/Toolbar"
import { ItemsBar } from "../../shared/components/Bars/ItemsBar"
import "./workField.css"
import { createNode, getNodes } from "../../services/node.service"
import { defaultNode } from "../../types/node"
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from "react"
import { Node } from "../../types/node"
import { updateNode } from "../../services/node.service"
import { BpsimNode } from "../../shared/components/BpsimNode"
import { ChartBackground } from "../../shared/components/Chart/Background"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import SubjectAreaAddModal from "../../shared/components/SubjectArea/Add"
import { useNavigate } from "react-router-dom"
import { urls } from "../../navigation/app.urls"
import { getSubjectArea } from "../../services/subjectArea.service"
import { setCurrentArea } from "../../store/reducers/subjectAreaReducer"
import SubjectAreaChoiceModal from "../../shared/components/SubjectArea/Choice"
import { getModels } from "../../services/model.service"
import { Model } from "../../types/model"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentModel, setModelItems } from "../../store/reducers/modelReducer"
import { SideBar } from "../../shared/components/Bars/SideBar"
import { Relation } from "../../types/relation"
import { createRelation, getRelations } from "../../services/relation.service"
import { formatBpsimToGraphicNodes } from "../../shared/hooks/nodeFormatter"
import { useOutletContext } from 'react-router-dom';
import { formatEdgesToRelations, formatEdgeToRelation, formatRelationsToEdges } from "../../shared/hooks/edgeFormatter"
import { startSimulation } from "../../services/simulation.service"
import { Console } from "./Console"
import { getResources, getResourceTypes } from "../../services/resource.service"
import { getMeasures } from "../../services/measure.service"
import { setResources, setResTypes } from "../../store/reducers/resourceRedicer"
import { setMeasures } from "../../store/reducers/measureReducer"

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

const nodeTypes = { textNode: BpsimNode, chartNode: ChartBackground };

interface IProps {
    isOpenSubAreaModal?: boolean
    isCreateSubAreaModal?: boolean
}

const WorkFieldScreen = ({ isCreateSubAreaModal = false, isOpenSubAreaModal = false }: IProps) => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);
    const [relations, setRelations] = useState<Relation[]>([]);
    const context = useOutletContext<{ showLoading: (show: boolean) => void }>();

    const [logs, setLogs] = useState<string[]>([]);

    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "smoothstep" }];
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [nodes, setNodes] = useState<INode[]>([]);
    const [edges, setEdges] = useState(initialEdges);

    const models = useSelector((state: any) => state.model.items);
    const currentModel = useSelector((state: any) => state.model.current);

    const [showNewSubAreaModal, setShowNewSubAreaModal] = useState(isCreateSubAreaModal);
    const [showOpenSubAreaModal, setShowOpenSubAreaModal] = useState(isOpenSubAreaModal);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const errors = [];
            bpsimNodes.forEach((node: any) => {
                updateNode(node).catch((error: AxiosError) => {
                    errors.push(error);
                });
            })
            errors.length == 0 ? toast.success('Данные сохранены') : toast.error('Данные сохранить не удалось');
        }
    }, []);

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
    }, []);

    const onEdgesChange = useCallback(
        (changes: any) => {
            setEdges((eds) => applyEdgeChanges(changes, eds))
            setRelations(formatEdgesToRelations(edges))
        },
        [],
    );

    const onConnect = useCallback((params: any) => {
        createRelation(formatEdgeToRelation(params))
            .then((response: any) => {
                if (response.status === 200) {
                    setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds))
                    setRelations(prevRelations => [...prevRelations, response.data]);
                }
                else {
                    toast.error('Сохранить связь не удалось');
                }
            })
    },
        [],
    );

    const onModelChoose = (model: Model) => {
        context.showLoading(true);

        dispatch(setCurrentModel(model));
        if (!model.id) return;
        localStorage.setItem('modelId', model.id.toString());

        const modelId = Number(model.id)

        getNodes(modelId).then((response: any) => {
            const data = response.data;
            setNodesCount(data.length);

            setBpsimNodes(data);
            setNodes(formatBpsimToGraphicNodes(data, setBpsimNodes));

            getRelations(modelId).then((response: any) => {
                const data = response.data;
                setRelations(data);
                setEdges(formatRelationsToEdges(data))
                context.showLoading(false);
            })
        })
    }


    useEffect(() => {
        if (localStorage.getItem('subjectAreaId') && !isCreateSubAreaModal && !isOpenSubAreaModal) {
            context.showLoading(true);
            getSubjectArea(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                dispatch(setCurrentArea(response.data));
            });

            getResourceTypes().then((response: any) => {
                if (response.status == 200) {
                    dispatch(setResTypes(response.data));
                }
                else toast.error('Ресурсы не загрузились');
            })

            getResources(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                if (response.status == 200) {
                    dispatch(setResources(response.data));
                }
            })

            getMeasures().then((response: any) => {
                if (response.status == 200) {
                    dispatch(setMeasures(response.data));
                }
            })

            getModels(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                if (response instanceof AxiosError) {
                    toast.error('Модели не загрузились');
                    context.showLoading(false);
                }
                else {
                    dispatch(setModelItems(response.data));
                    if (currentModel == null)
                        context.showLoading(false);
                    else if (models.length > 0) {
                        getNodes(currentModel.id).then((response: any) => {
                            setNodesCount(response.data.length);

                            const nodes = response.data;
                            setBpsimNodes(nodes);
                            setNodes(formatBpsimToGraphicNodes(nodes, setBpsimNodes));
                        })

                        getRelations(currentModel.id).then((response: any) => {
                            if (response instanceof AxiosError) {
                                toast.error('Связи не загрузились');
                            }
                            else {
                                setRelations(response.data);
                                setEdges(formatRelationsToEdges(response.data))
                            }
                        })
                    }
                    context.showLoading(false);
                }
            })
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }

    }, [handleKeyPress, nodesCount, localStorage.getItem('subjectAreaId'), isCreateSubAreaModal, isOpenSubAreaModal]);

    const onNodeAddClick = () => {
        defaultNode.model_id = currentModel.id;
        createNode(defaultNode)
            .then((response: any) => {
                const createdNode = response.data;
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

    const onStartClick = () => {

        startSimulation(Number(localStorage.getItem('subjectAreaId')), currentModel.id).then((response: any) => {
            if (response.status == 200) {
                setLogs(response.data.report);
                toast.success('Симуляция прошла успешно!');
                console.log(response.data.table);
            }
            else {
                toast.error('Симуляцию запустить не удалось');
            }
        })
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

    const onChartAddClick = () => {
        const chartField = {
            model_id: currentModel.id,
            data: {
                label: 'Диаграмма 1',
                updateStateNodes: (nodes: any) => {
                    setBpsimNodes(nodes);
                    setNodesCount(nodes.length);
                },
            },
            position: {
                x: 0,
                y: 0
            },
            type: 'chartNode',
            key: 'chartField',
            id: 'chartField',
        }
        setNodes((prevNodes) => [...prevNodes, chartField]);
    }

    return (
        <div className="work-field">
            <Toolbar onSaveClick={onSaveClick} />
            <ItemsBar
                onStart={onStartClick}
                onCreateSubAreaModal={onCreateSubAreaModal}
                onOpenSubAreaModal={onOpenSubAreaModal}
                onNodeAddClick={onNodeAddClick}
                onChartAddClick={onChartAddClick} />
            <div className="work-field-main">
                <SideBar onModelChoose={onModelChoose} />
                <div className="work-field-content">
                    <div className="flow-content">
                        <ReactFlow nodes={nodes} edges={edges}
                            onNodesChange={memoizedOnNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            proOptions={{ hideAttribution: true }}
                        >
                            <Background variant={BackgroundVariant.Dots} gap={20} />
                            <Controls />
                        </ReactFlow>
                    </div>
                    <Console data={logs} />
                </div>
            </div>
            {showNewSubAreaModal && <SubjectAreaAddModal isOpen={showNewSubAreaModal} onClose={onSubAreaModalCreateClose} />}
            {showOpenSubAreaModal && <SubjectAreaChoiceModal isOpen={showOpenSubAreaModal} onClose={onSubAreaModalChoiceClose} />}
        </div>
    )
}

export default WorkFieldScreen