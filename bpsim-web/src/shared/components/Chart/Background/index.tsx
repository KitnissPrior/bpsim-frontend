import { Position } from "@xyflow/react";
import { useState, MouseEvent } from "react";
import "./chartBackground.css"
import { NodeContextMenu } from "../../ContextMenu/Menu";
import ContextMenu from "../../ContextMenu";
import ConfirmModal from "../../Modals/Confirm";
import { ChartPropsModal } from "../PropsModal";

interface IProps {
    id: string;
    data: {
        label: string;
        updateStateNodes?: (nodes: any) => void
    };
    position?: Position;
    model_id?: number;
}

export const ChartBackground = ({ id, data }: IProps) => {
    const [label, setLabel] = useState(data.label);
    const [propsVisible, setPropsVisible] = useState(false);
    const [contextVisible, setContextVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

    const onChange = (evt: any) => {
        setLabel(evt.target.value);
    };

    const onPropsOpen = () => {
        setPropsVisible(true);
    }
    const onPropsClose = () => {
        setPropsVisible(false);
    }

    const onContextOpen = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        setContextVisible(true);
    }

    const onContextClose = () => {
        setContextVisible(false);
    }

    const onDeleteConfirmOpen = () => {
        setDeleteConfirmVisible(true);
    }

    const onDeleteConfirmClose = () => {
        setDeleteConfirmVisible(false);
    }


    return (
        <div className="chart-background-container" onContextMenu={onContextOpen}>
            <input
                id="text"
                name="text"
                onChange={onChange}
                className="text--body-s chart-name-input"
                defaultValue={label}
            />
            <div className='chart-name-hr' />
            <div className="chart-content">
                {`тут будет диаграмма`}
            </div>
            {contextVisible &&
                <ContextMenu
                    onClose={onContextClose}
                    children={
                        <NodeContextMenu
                            onDelete={onDeleteConfirmOpen}
                            onClose={onContextClose}
                            onPropsOpen={onPropsOpen} />
                    }
                />}
            <ConfirmModal isOpen={deleteConfirmVisible} onOk={onDeleteConfirmClose}
                onCancel={onDeleteConfirmClose} content="Удалить диаграмму?" okText="Да" cancelText="Нет" />
            <ChartPropsModal isOpen={propsVisible} onClose={onPropsClose} name={label} />
        </div>
    )
}