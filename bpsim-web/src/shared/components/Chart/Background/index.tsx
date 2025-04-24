import { Position } from "@xyflow/react";
import { useState, MouseEvent, useEffect } from "react";
import "./chartBackground.css"
import { NodeContextMenu } from "../../ContextMenu/Menu";
import ContextMenu from "../../ContextMenu";
import ConfirmModal from "../../Modals/Confirm";
import { ChartPropsModal } from "../PropsModal";
import { useDispatch, useSelector } from "react-redux";
import { setChartName, setChartObjectId, setChartObjectName } from "../../../../store/reducers/chartReducer";
import { ResourcesModal } from "../../Modals/Resources";
import { ModalType } from "../../../../enums/modalType.enum";
import { ChartContent } from "../Content";

interface IProps {
    id: string;
    data: {
        label: string;
        updateStateNodes?: (nodes: any) => void
    };
    position?: Position;
    model_id?: number;
}

export const ChartBackground = ({ data }: IProps) => {
    const [label, setLabel] = useState(data.label);
    const [propsVisible, setPropsVisible] = useState(false);
    const [contextVisible, setContextVisible] = useState(false);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [resSelectVisible, setResSelectVisible] = useState(false);
    const dispatch = useDispatch();

    const resources = useSelector((state: any) => state.resource.resources);
    const chartObjectId = useSelector((state: any) => state.chart.currentChartObjectId);
    const chartValues = useSelector((state: any) => state.chart.currentValues);
    const chartName = useSelector((state: any) => state.chart.currentChartName);

    const onChange = (evt: any) => {
        setLabel(evt.target.value);
        dispatch(setChartName(evt.target.value));
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

    const onResSelectOpen = () => {
        setResSelectVisible(true);
    }

    const onResClick = (res: any) => {
        dispatch(setChartObjectName(res.name));
        dispatch(setChartObjectId(res.id));
    }

    const onResSelect = () => {
        setResSelectVisible(false);
    }

    return (
        <div className="chart-background-container" onContextMenu={onContextOpen}>
            <input
                id="text"
                name="text"
                onChange={onChange}
                className="text--body-l chart-name-input"
                defaultValue={chartName}
            />
            <div className='chart-name-hr' />
            <div className="chart-content">
                {chartValues && <ChartContent data={chartValues} />}
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
            <ChartPropsModal isOpen={propsVisible} onClose={onPropsClose} onResSelectOpen={onResSelectOpen} />
            <ResourcesModal isOpen={resSelectVisible} onClose={() => setResSelectVisible(false)}
                modalType={ModalType.Select} data={resources} onClick={onResClick} onSelect={onResSelect}
                selectedRes={chartObjectId} />
        </div>
    )
}