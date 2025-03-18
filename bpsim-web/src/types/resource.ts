export type Resource = {
    id: number;
    name: string;
    type_id: number;
    current_value: number;
    min_value: number;
    max_value: number;
    
}

export type ResourceType = {
    id: number;
    name: string;
}