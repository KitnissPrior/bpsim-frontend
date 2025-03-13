export const formatBpsimToGraphicNode = (node: any) => {
    return {
        key: node.id.toString(),
        id: node.id.toString(),
        position: { x: node.posX, y: node.posY },
        data: { label: node.name },
        sourcePosition: "right",
        targetPosition: "left",
        type: 'textNode'
    }
}

export const formatGraphicToBpsimNode = (node: any) => {
    return {
        ...node,
        type: node.type,
    }
}

export const formatBpsimToGraphicNodes = (nodes: any) => {
    const newNodes: any = [];
    nodes.forEach((node: any) => {
        newNodes.push(formatBpsimToGraphicNode(node))
    });
    return newNodes;
}

export const formatGraphicToBpsimNodes = (nodes: any) => {
    const newNodes: any = [];
    nodes.forEach((node: any) => {
        newNodes.push(formatGraphicToBpsimNode(node))
    });
    return newNodes;
}
