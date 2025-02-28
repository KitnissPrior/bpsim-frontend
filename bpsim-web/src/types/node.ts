export type Node = {
    id?: string | null;
    name?: string | null;
    posX?: number | null;
    posY?: number | null;
    description?: string | null;
}

export const defaultNode: Node = {
    name: null,
    posX: 0,
    posY: 0,
    description: null
};