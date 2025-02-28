import Toolbar from "../../shared/components/Toolbar"
import { ItemsBar } from "./ItemsBar"
import "./workField.css"
import { BaseButton } from "../../shared/components/Buttons/BaseButton"
import { createNode, getNodes } from "../../services/node.service"
import { defaultNode } from "../../types/node"
import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from "react"
import { Node } from "../../types/node"



const WorkFieldScreen = () => {
    const [nodesCount, setNodesCount] = useState(0);
    const [bpsimNodes, setBpsimNodes] = useState<Node[]>([]);
    //const flowNodes: any = [];


    const initialNodes = [
        {
            id: '1',
            position: { x: 0, y: 0 },
            data: { label: 'Узел1' },
        },
        {
            id: '2',
            position: { x: 100, y: 100 },
            data: { label: 'Узел2' },
        },
    ];
    const initialEdges = [{ id: '1-2', source: '1', target: '2', type: "step" }];

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );


    useEffect(() => {
        getNodes().then((response: any) => {
            setNodesCount(response.data.length);
            setBpsimNodes(response.data);
            // bpsimNodes.forEach(node => {
            //     flowNodes.push({ id: node.id, position: { x: 0, y: 0 }, data: { label: node.name } });
            // });
        })

    }, [nodesCount])



    const onNodeAddClick = () => {
        createNode(defaultNode)
            .then((response: any) => {
                console.log(response.data);
                // flowNodes.push({ id: response.data.id, position: { x: 20, y: 20 }, data: { label: response.data.name } });
                // console.log(bpsimNodes);
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
                    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </div>
        </div>
    )
}

export default WorkFieldScreen