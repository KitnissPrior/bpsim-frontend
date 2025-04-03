import { useEffect, useState, useRef } from "react";
import FormModal from "../../../../Modals/Form";
import KioskBoard from "kioskboard";
import { Table } from "../../../../Table";
import { ITableRes } from "../ResSelect";
import "./formulaModal.css"
import TextInput from "../../../../Inputs/Text";
import { TableType } from "../../../../../../enums/tableType.enum";
import { useDispatch, useSelector } from "react-redux";
import { addReadyResource, setValue } from "../../../../../../store/reducers/nodeResReducer";
import { BaseButton } from "../../../../Buttons/Base";

interface IProps {
    isOpen: boolean
    data: any[]
    onClose: () => void
}

export const ResFormulaModal = ({ isOpen, onClose, data }: IProps) => {
    //const keyboardRef = useRef(null);
    const [resources, setResources] = useState<ITableRes[]>([]);
    const dispatch = useDispatch();

    const formula = useSelector((state: any) => state.nodeRes.selectedResValue);
    const selectedRes = useSelector((state: any) => state.nodeRes.selectedResource);
    const resInOut = useSelector((state: any) => state.nodeRes.res_in_out);
    const currentNodeId = useSelector((state: any) => state.nodeRes.node_id);

    const onResourceClick = (item: any) => {
        dispatch(setValue((formula + item.sys_name)));
    }

    const onFormulaChange = (evt: any) => {
        dispatch(setValue(evt.target.value));
    }

    useEffect(() => {
        setResources(data.map((res) => { return { sys_name: res.sys_name, name: res.name } }))
        //     if (keyboardRef.current) {
        //         KioskBoard.run(keyboardRef.current, {
        //             language: "en",
        //             theme: "light",
        //             keysArrayOfObjects: [
        //                 {
        //                     "0": "0",
        //                     "1": "1",
        //                     "2": "2",
        //                     "3": "3",
        //                     "4": "4",
        //                     "5": "5",
        //                     "6": "6",
        //                     "7": "7",
        //                     "8": "8",
        //                     "9": "9",
        //                     "10": "+",
        //                     "11": "-",
        //                     "12": "*",
        //                     "13": "/",

        //                 },
        //                 {
        //                     "0": "^",
        //                     "1": "&",
        //                     "2": "?",
        //                     "3": "!",
        //                     "4": "=",
        //                     "5": "<",
        //                     "6": ">",
        //                     "7": "≤",
        //                     "8": "≥",
        //                     "9": "<>",
        //                     "10": "(",
        //                     "11": ")",
        //                     "12": "[",
        //                 },
        //             ]
        //         });
        //     }
    }, []);

    const onNodeResSave = () => {
        const nodeRes = {
            node_id: currentNodeId,
            res_id: selectedRes.id,
            model_id: Number(localStorage.getItem('modelId')),
            value: formula,
            res_in_out: resInOut,
        }
        console.log("Добавлен ресурс узла:", nodeRes)
        dispatch(addReadyResource(nodeRes));
        onClose();
    }

    return (
        <FormModal isOpen={isOpen} onClose={onClose} title="Формула"
            content={
                <div className="formula-res-modal-body">
                    {/* {<input
                        className="inputFromKey"
                        ref={keyboardRef}
                        type="text"
                        data-kioskboard-type="keyboard"
                        placeholder="" />} */}
                    <input className="formula-input" type="text" value={formula} onChange={onFormulaChange} />
                    <Table data={resources} headers={["Систем. имя", "Наименование",]}
                        type={TableType.Select}
                        onItemClick={onResourceClick} />
                    <BaseButton text="Применить формулу" onClick={onNodeResSave} className="modal-save-btn" />
                </div>
            }
        />
    )
}