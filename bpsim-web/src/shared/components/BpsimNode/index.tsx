import { Position, Handle } from '@xyflow/react';
import { useCallback, useState, MouseEvent } from 'react';
import './bpsimNode.css';
import { updateNode } from '../../../services/node.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { deleteNode } from '../../../services/node.service';
import NodeContextMenu from './components/ContextMenu';
import ConfirmModal from '../Modals/Confirm';
import ContextMenu from '../ContextMenu';
import { NodePropsModal } from './components/PropsModal';

interface IProps {
  id: string;
  data: {
    label: string;
  };
  position?: Position;
  model_id?: number;
}

export const BpsimNode = ({ id, data }: IProps) => {
  const [label, setLabel] = useState(data.label);
  const modelId = useSelector((state: any) => state.model.current.id);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [propsVisible, setPropsVisible] = useState(false);

  const onChange = (evt: any) => {
    setLabel(evt.target.value);
  };

  const onBlur = useCallback((evt: any) => {
    if (data.label === evt.target.value) return;
    updateNode({
      id: id,
      name: evt.target.value,
      model_id: modelId
    }).then((response: any) => {
      if (response.status === 200) {
        setLabel(evt.target.value);
        toast.success('Имя узла успешно изменено');
      } else {
        toast.error('Имя сохранить не удалось');
      }
    });
  }, [id, label]);

  const onRightClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setContextMenuVisible(true);
  }

  const onDelete = () => {
    deleteNode(id).then((response: any) => {
      if (response.status === 200) {
        toast.success('Узел успешно удален');
        setDeleted(true);
      } else {
        toast.error('Узел удалить не удалось');
      }
    })
    setContextMenuVisible(false);
    setDeleteConfirmVisible(false);
  }
  const onDeleteConfirmOpen = () => {
    setDeleteConfirmVisible(true);
  }

  const onHideContextMenu = () => {
    setContextMenuVisible(false);
  }

  const onPropsOpen = () => {
    setContextMenuVisible(false);
    setPropsVisible(true);
  }

  const onPropsClose = () => {
    setPropsVisible(false);
  }

  return (
    <>
      <div className="text-updater-node" onContextMenu={onRightClick} hidden={deleted}>
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

        {deleteConfirmVisible &&
          <ConfirmModal
            isOpen={deleteConfirmVisible}
            onCancel={() => {
              setDeleteConfirmVisible(false);
              setContextMenuVisible(false)
            }}
            onOk={onDelete}
            content={"Вы уверены что хотите удалить узел?"}
            okText="Удалить" />}
      </div>
      {contextMenuVisible &&
        <ContextMenu
          children={
            <NodeContextMenu
              onDelete={onDeleteConfirmOpen}
              onClose={onHideContextMenu}
              onPropsOpen={onPropsOpen} />
          }
        />}
      {propsVisible &&
        <NodePropsModal isOpen={propsVisible} name={data.label} onClose={onPropsClose} node_id={Number(id)} />}
    </>
  );
};