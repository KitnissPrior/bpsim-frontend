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