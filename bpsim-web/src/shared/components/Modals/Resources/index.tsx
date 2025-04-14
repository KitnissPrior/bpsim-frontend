import { useState, useEffect } from "react";
import { Table } from "../../Table";
import { useSelector } from "react-redux";
import { ModalType } from "../../../../enums/modalType.enum";
import { Resource } from "../../../../types/resource";
import { BaseButton } from "../../Buttons/Base";
import TextError from "../../Errors/TextError";
import FormModal from "../Form";
import { TableType } from "../../../../enums/tableType.enum";

interface IProps {
    isOpen: boolean
    data: Resource[];
    modalType: ModalType
    onClose: () => void
    onSelect?: () => void
    onClick?: (res: any) => void
    selectedRes?: any
}

export interface ITableRes {
    sys_name: string
    name: string
}

export const ResourcesModal = ({ isOpen, onClose, onSelect, onClick, ...props }: IProps) => {
    const [error, setError] = useState('');
    const [resources, setResources] = useState<ITableRes[]>([]);

    //const selectedRes = useSelector((state: any) => state.nodeRes.selectedResource);
    useEffect(() => {
        setResources(props.data.map((item: any) => ({ sys_name: item.sys_name, name: item.name })));
    }, []);

    const onResourceClick = (tableRes: ITableRes) => {
        setError('');
        const res = props.data.find((item: any) => item.sys_name === tableRes.sys_name);
        if (res) {
            onClick?.(res);
        }
    };

    const onResourceSelect = () => {
        if (!props.selectedRes) {
            setError('Выберите ресурс');
            return;
        }
        onClose();
        onSelect?.();
    }
    return (
        <FormModal onClose={onClose} isOpen={isOpen} title="Ресурсы"
            content={
                <div>
                    <Table data={resources} headers={["Систем. имя", "Наименование"]}
                        onItemClick={onResourceClick}
                        type={props.modalType === ModalType.Select ? TableType.Select : TableType.Info} />
                    {error !== '' ? <TextError text={error} /> : ''}
                    {props.modalType === ModalType.Select &&
                        <BaseButton text="Выбрать" onClick={onResourceSelect} className="modal-save-btn" />}
                </div>
            } />
    )
}