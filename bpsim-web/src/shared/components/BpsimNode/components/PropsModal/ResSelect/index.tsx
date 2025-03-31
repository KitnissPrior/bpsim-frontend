import { Resource } from "../../../../../../types/resource"
import FormModal from "../../../../Modals/Form"
import { Table } from "../../../../Table";
import { selectResource } from "../../../../../../store/reducers/nodeResReducer";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "../../../../Buttons/Base";
import TextError from "../../../../Errors/TextError";
import { useEffect, useState } from "react";

interface IProps {
    isOpen: boolean
    onClose: () => void
    data: Resource[];
}

interface ITableRes {
    sys_name: string
    name: string
}

export const ResourceSelectModal = ({ isOpen, onClose, data }: IProps) => {
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
        dispatch(selectResource(res));
    };

    const onResourceSave = () => {
        if (!selectedRes) {
            setError('Выберите ресурс');
            return;
        }
        console.log("Сохранен ресурс ", selectedRes.name);
        onClose();
    }
    return (
        <FormModal onClose={onClose} isOpen={isOpen}
            content={
                <div>
                    <Table data={resources} headers={["Систем. имя", "Наименование"]}
                        onItemClick={onResourceClick} selectable={true} />
                    {error !== '' ? <TextError text={error} /> : ''}
                    <BaseButton text="Выбрать" onClick={onResourceSave} className="modal-save-btn" />
                </div>

            } />

    )
}