import { Position, Handle } from '@xyflow/react';
import { useCallback, useState } from 'react';
import './bpsimNode.css';
import { updateNode } from '../../../services/node.service';
import { toast } from 'react-toastify';
// import { Node } from "../../types/node"

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

const handleStyle = { left: 10 };

export const BpsimNode = ({ id, data }: IProps) => {

  const [label, setLabel] = useState(data.label);

  const onChange = (evt: any) => setLabel(evt.target.value);

  const onBlur = useCallback((evt: React.FocusEvent<HTMLInputElement>) => {
    if (label === evt.target.value) return;
    updateNode({
      id: id,
      name: evt.target.value
    }).then((response: any) => {
      toast.success('Название узла изменено');
      setLabel(evt.target.value);
    });
  }, [id]);

  return (
    <>

      <div className="text-updater-node">
        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={true}
        />
        <Handle
          type="target"
          position={Position.Left}
          id={id.toString() + "target"}
          isConnectable={true}
        />
        <div className='node-text-container'>
          {/* <input id="text" name="text" onChange={onChange} className="nodrag" defaultValue={data.label} /> */}
          <input id="text" name="text" onChange={onChange} className="node-text-field" defaultValue={label} onBlur={onBlur} />
        </div>
      </div>

    </>
  );
}
