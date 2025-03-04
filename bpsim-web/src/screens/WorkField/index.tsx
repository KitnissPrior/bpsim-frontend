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

const WorkFieldScreen = ({ isCreateSubAreaModal = false }: IProps) => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);
    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "step" }];

    const [nodes, setNodes] = useState<INode[]>([]);
    const [edges, setEdges] = useState(initialEdges);

    const [showNewSubAreaModal, setShowNewSubAreaModal] = useState(isCreateSubAreaModal);

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
            //console.log(updatedNodes)
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
        getNodes().then((response: any) => {
            setNodesCount(response.data.length);
            setBpsimNodes(response.data);
            const newNodes: any = [];
            response.data.forEach((node: any) => {
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

    }, [nodesCount])


    const onNodeAddClick = () => {
        defaultNode.model_id = 3;
        createNode(defaultNode)
            .then((response: any) => {
                const createdNode = response.data;
                console.log(createdNode);
                setBpsimNodes(prevNodes => [...prevNodes, createdNode]);

                // setNodes(prevNodes => {
                //     const newNodes = [...prevNodes];
                //     newNodes.push({
                //         key: (createdNode.id + 100).toString(),
                //         id: createdNode.id.toString(),
                //         position: { x: createdNode.posX, y: createdNode.posY },
                //         data: { label: createdNode.name },
                //         type: 'textNode'
                //     });
                //     console.log(newNodes);
                //     toast.success('Новый узел создан');
                //     return newNodes;
                // });
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

    const onSubjectAreaAdd = () => {

    }

    const onSubAreaModalClose = () => {
        setShowNewSubAreaModal(false);
    }

    return (
        <div className="work-field">
            <Toolbar onSaveClick={onSaveClick} />
            <ItemsBar onNodeAddClick={onNodeAddClick} />
            <div className="work-field-main">
                <div className="sidebar">

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
                <SubjectAreaAddModal isOpen={showNewSubAreaModal} onClose={onSubAreaModalClose} onSubjectAdd={onSubjectAreaAdd} />
            </div>
        </div>
    )
}

export default WorkFieldScreen