import { Resource } from "../../../../../../types/resource"
import FormModal from "../../../../Modals/Form"
import { Table } from "../../../../Table";
import { addReadyResource, selectResource, setValue } from "../../../../../../store/reducers/nodeResReducer";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "../../../../Buttons/Base";
import TextError from "../../../../Errors/TextError";
import { useEffect, useState } from "react";
import { TableType } from "../../../../../../enums/tableType.enum";

interface IProps {
    isOpen: boolean
    data: Resource[];
    onClose: () => void
    onSelect: () => void
}

export interface ITableRes {
    sys_name: string
    name: string
}

export const ResourceSelectModal = ({ isOpen, onClose, onSelect, data }: IProps) => {
    const [error, setError] = useState('');
    const [resources, setResources] = useState<ITableRes[]>([]);
    const dispatch = useDispatch();

    const selectedRes = useSelector((state: any) => state.nodeRes.selectedResource);
    useEffect(() => {
        setResources(data.map((item: any) => ({ sys_name: item.sys_name, name: item.name })));
    }, []);

    const onResourceClick = (tableRes: ITableRes) => {
        setError('');
        const res = data.find((item: any) => item.sys_name === tableRes.sys_name);
        if (res) {
            dispatch(selectResource(res));
            dispatch(setValue(res.sys_name + ":="));
        }
    };

    const onResourceSelect = () => {
        if (!selectedRes) {
            setError('Выберите ресурс');
            return;
        }
        onClose();
        onSelect();
    }
    return (
        <FormModal onClose={onClose} isOpen={isOpen} title="Ресурсы"
            content={
                <div>
                    <Table data={resources} headers={["Систем. имя", "Наименование"]}
                        onItemClick={onResourceClick} type={TableType.Select} />
                    {error !== '' ? <TextError text={error} /> : ''}
                    <BaseButton text="Выбрать" onClick={onResourceSelect} className="modal-save-btn" />
                </div>

            } />

    )
}