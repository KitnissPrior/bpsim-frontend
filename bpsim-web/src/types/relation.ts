export type Relation = {
    id?: number | string;
    source_id: number | null;
    target_id: number | null;
    model_id: number;
}

export const defaultRelation: Relation = {
    model_id: 0,
    source_id: null,
    target_id: null,
}