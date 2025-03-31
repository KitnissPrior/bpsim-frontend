import { Resource } from "./resource";

export type Node = {
    key?: string | null;
    id?: string | null;
    name?: string | null;
    posX?: number | null;
    posY?: number | null;
    description?: string | null;
    model_id?: number | null;
}

export const defaultNode: Node = {
    name: null,
    posX: 0,
    posY: 0,
    description: null,
    model_id: null
};

export type NodeDetails = {
    id: number;
    node_id: number;
    duration: string;
    cost: number;
}

export type NodeRes = {
    id: number | null;
    value: string;
    res_in_out: number; // 0 - in, 1 - out
    node_id: number;
    res_id: number;
    model_id: number;
}

export type NodeResState = {
    selectedResource: Resource | null;
    selectedResValue: string;
    resources: NodeRes[]
}