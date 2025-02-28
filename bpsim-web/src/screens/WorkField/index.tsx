import Toolbar from "../../shared/components/Toolbar"
import { ItemsBar } from "./ItemsBar"
import "./workField.css"
import { BaseButton } from "../../shared/components/Buttons/BaseButton"
import { createNode, getNodes } from "../../services/node.service"
import { defaultNode } from "../../types/node"
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from "react"
import { Node } from "../../types/node"

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
}

const WorkFieldScreen = () => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);

    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "step" }];

    const [nodes, setNodes] = useState<INode[]>([]);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => {
            setNodes((nds) => applyNodeChanges(changes, nds))

        },
        [],
    );

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
                    key: node.id,
                    id: node.id.toString(),
                    position: { x: node.posX, y: node.posY },
                    data: { label: node.name },
                    sourcePosition: "right",
                    targetPosition: "left"
                });
            });
            setNodes(newNodes);
        })

    }, [nodesCount])



    const onNodeAddClick = () => {
        createNode(defaultNode)
            .then((response: any) => {
                const createdNode = response.data;
                setBpsimNodes(prevNodes => [...prevNodes, createdNode]);

                setNodes(prevNodes => {
                    const newNodes = [...prevNodes];
                    newNodes.push({
                        key: (createdNode.id + 1) as string,
                        id: createdNode.id as string,
                        position: { x: createdNode.posX, y: createdNode.posY },
                        data: { label: createdNode.name }
                    });
                    return newNodes;
                });
                console.log(bpsimNodes)

                setNodesCount(prev => prev + 1);
            })
    }

    return (
        <div className="work-field">
            <Toolbar />
            <ItemsBar onNodeAddClick={onNodeAddClick} />
            <div className="work-field-main">
                <div className="sidebar">
                    <BaseButton text="Создать ПО" onClick={() => console.log("Создать ПО")} />
                    <BaseButton text="Открыть ПО" onClick={() => console.log("Открыть ПО")} />
                </div>
                <div className="vertical-line"></div>
                <div className="work-field-content">
                    <ReactFlow nodes={nodes} edges={edges}
                        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </div>
    )
}

export default WorkFieldScreen