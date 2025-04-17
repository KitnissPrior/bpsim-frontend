export type ModelControl = {
    id: number;
    control_name?: string | null;
    model_id: number;
    type: number;
    pos_x: number;
    pos_y: number;
    width?: number;
    height?: number;
}

export enum ControlType {
    NODE,
    CHART
}