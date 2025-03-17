export const formatBpsimToGraphicNode = (node: any, updateStateNodes?: any) => {
    return {
        key: node.id.toString(),
        id: node.id.toString(),
        position: { x: node.posX, y: node.posY },
        data: { label: node.name, updateStateNodes: updateStateNodes },
        sourcePosition: "right",
        targetPosition: "left",
        type: 'textNode'
    }
}

export const formatGraphicToBpsimNode = (node: any) => {
    return {
        ...node,
        id: Number(node.id),
        name: node.data.label,
        posX: node.position.x,
        posY: node.position.y
    }
}

export const formatBpsimToGraphicNodes = (BPnodes: any, updateStateNodes?: any) => 
    BPnodes.map((node: any) => formatBpsimToGraphicNode(node, updateStateNodes))

export const formatGraphicToBpsimNodes = (nodes: any) => nodes.map((node: any) => formatGraphicToBpsimNode(node))
