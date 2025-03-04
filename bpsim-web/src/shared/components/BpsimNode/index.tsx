import { Position, Handle } from '@xyflow/react';
import { useCallback, useState } from 'react';
import './bpsimNode.css';
import { updateNode } from '../../../services/node.service';
import { toast } from 'react-toastify';

interface IProps {
  id: string;
  data: {
    label: string;
  };
  position?: Position; // Используем тип Position из @xyflow/react
  model_id?: number;
}

export const BpsimNode = ({ id, data }: IProps) => {
  const [label, setLabel] = useState(data.label);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  };

  const onBlur = useCallback((evt: React.FocusEvent<HTMLInputElement>) => {
    if (label === evt.target.value) return;
    updateNode({
      id: id,
      name: evt.target.value,
      model_id: 3
    }).then((response: any) => {
      if (response.status === 200) {
        setLabel(evt.target.value);
        toast.success('Имя узла успешно изменено');
      } else {
        toast.error('Имя сохранить не удалось');
      }
    });
  }, [id, label]);

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
          <input
            id="text"
            name="text"
            onChange={onChange}
            className="text--body-xs node-text-field"
            defaultValue={label}
            onBlur={onBlur}
          />
        </div>
      </div>
    </>
  );
};