export type Resource = {
    id?: number | null;
    name: string;
    sys_name?: string | null;
    current_value: number;
    min_value: number;
    max_value: number;
    type_id: number;
    sub_area_id: number;
    measure_id?: number;
}

export type ResourceType = {
    id: number;
    name: string;
    prefix: string;
}