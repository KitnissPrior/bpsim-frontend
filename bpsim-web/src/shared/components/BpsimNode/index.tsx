import { Position, Handle } from '@xyflow/react';
import { useCallback, useState, MouseEvent } from 'react';
import './bpsimNode.css';
import { updateNode } from '../../../services/node.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNode } from '../../../services/node.service';
import { NodeContextMenu } from '../../components/ContextMenu/Menu'
import ConfirmModal from '../Modals/Confirm';
import ContextMenu from '../ContextMenu';
import { NodePropsModal } from './components/PropsModal';
import { getNodeDetails } from '../../../services/nodeDetails';
import { AxiosError } from 'axios';
import { clearNewResources } from '../../../store/reducers/nodeResReducer';

interface IProps {
  id: string;
  data: {
    label: string;
    updateStateNodes: (nodes: any) => void
  };
  position?: Position;
  model_id?: number;
}

export const BpsimNode = ({ id, data }: IProps) => {
  const [label, setLabel] = useState(data.label);
  const [details, setDetails] = useState({})
  const dispatch = useDispatch();

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [propsVisible, setPropsVisible] = useState(false);

  const modelId = useSelector((state: any) => state.model.current.id);

  const onChange = (evt: any) => {
    setLabel(evt.target.value);
  };

  const onBlur = useCallback((evt: any) => {
    if (data.label == evt.target.value) return;
    updateNode({
      id: id,
      name: evt.target.value,
      model_id: modelId
    }).then((response: any) => {
      if (response.status === 200) {
        setLabel(evt.target.value);

        data.updateStateNodes(((prevNodes: any[]) => prevNodes.map((node: any) => node.id == id ?
          { ...node, name: evt.target.value } : node)));

        toast.success('Имя узла успешно изменено');
      } else {
        const error = response.response as any;
        if (error.status === 409) {
          toast.error(error.data.detail);
        }
        else toast.error('Имя сохранить не удалось');
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
    getNodeDetails(Number(id)).then((response: any) => {
      if (response instanceof AxiosError) {
        toast.error("Свойства узла не загрузились")
        return;
      }
      setDetails(() => response.data)
      setDetails((prev) => ({ ...prev, name: data.label }))
      setContextMenuVisible(false);
      setPropsVisible(true);
    })

  }

  const onPropsClose = () => {
    dispatch(clearNewResources());
    setPropsVisible(false);
  }

  return (
    <div className="text-updater-node" onContextMenu={onRightClick} hidden={deleted}>
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={id.toString() + "target-left"}
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
          content={"Вы уверены, что хотите удалить узел?"}
          okText="Удалить" />}
      {contextMenuVisible &&
        <ContextMenu
          onClose={onHideContextMenu}
          children={
            <NodeContextMenu
              onDelete={onDeleteConfirmOpen}
              onClose={onHideContextMenu}
              onPropsOpen={onPropsOpen} />
          }
        />}
      {propsVisible &&
        <NodePropsModal isOpen={propsVisible} onClose={onPropsClose} details={details}
          node_id={Number(id)} />}
    </div>
  );
};