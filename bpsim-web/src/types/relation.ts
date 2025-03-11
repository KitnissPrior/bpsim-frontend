export type Relation = {
    id?: number | string;
    source_id: number | null;
    target_id: number | null;
    node_id: number;
}

export const defaultRelation: Relation = {
    node_id: 0,
    source_id: null,
    target_id: null,
}