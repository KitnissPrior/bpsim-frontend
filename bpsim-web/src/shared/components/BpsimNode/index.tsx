import { Position, Handle } from '@xyflow/react';
import { Node } from '../../../types/node';

interface IProps {
  id: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export const BpsimNode = ({ id, data, position }: IProps) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};