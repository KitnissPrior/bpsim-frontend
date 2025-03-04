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
import { SubjectArea } from "../../types/subjectArea"
import SubjectAreaChoiceModal from "../../shared/components/Modals/SubAreaChoice"
import { getModels } from "../../services/model.service"
import { Model } from "../../types/model"

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
export const FRUITS_MODEL_ID = 3;

const WorkFieldScreen = ({ isCreateSubAreaModal = false, isOpenSubAreaModal = false }: IProps) => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);
    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "step" }];
    const navigate = useNavigate();

    const [nodes, setNodes] = useState<INode[]>([]);
    const [edges, setEdges] = useState(initialEdges);
    const [subjectArea, setSubjectArea] = useState<SubjectArea>({} as SubjectArea);

    const [models, setModels] = useState<Model[]>([]);

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
    }, []);

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({ ...params, type: 'step' }, eds)),
        [],
    );


    useEffect(() => {

        if (localStorage.getItem('subjectAreaId')) {
            getSubjectArea(Number(localStorage.getItem('subjectAreaId'))).then((response: any) => {
                setSubjectArea(response.data);
            });
        }

        getModels().then((response: any) => {
            if (response instanceof AxiosError) {
                toast.error('Модели не загрузились');
            }
            else {
                const filteredModels = response.data.filter((model: any) => model.sub_area_id == Number(localStorage.getItem('subjectAreaId')));
                setModels(filteredModels);
            }
        })

        getNodes().then((response: any) => {
            setNodesCount(response.data.length);
            const filteredNodes = response.data.filter((node: any) => node.model_id == FRUITS_MODEL_ID);
            //const filteredNodes = response.data;
            setBpsimNodes(filteredNodes);
            const newNodes: any = [];
            filteredNodes.forEach((node: any) => {
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

    }, [nodesCount, localStorage.getItem('subjectAreaId')]);


    const onNodeAddClick = () => {
        defaultNode.model_id = FRUITS_MODEL_ID;
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

    return (
        <div className="work-field">
            <Toolbar onSaveClick={onSaveClick} />
            <ItemsBar onNodeAddClick={onNodeAddClick} />
            <div className="work-field-main">
                <div className="sidebar">
                    <div>Предметная область: {subjectArea ? subjectArea.name : "Не выбрана"}</div>
                    <div>Модели:</div>
                    {models.map((model: any) => {
                        if (model.id == FRUITS_MODEL_ID) {
                            return (
                                <div key={model.id}>{model.name}*</div>
                            )
                        }
                        return (
                            <div key={model.id}>{model.name}</div>
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