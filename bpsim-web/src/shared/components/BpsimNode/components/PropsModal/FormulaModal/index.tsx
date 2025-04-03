import { useEffect, useState, useRef } from "react";
import FormModal from "../../../../Modals/Form";
import KioskBoard from "kioskboard";
import { Table } from "../../../../Table";
import { ITableRes } from "../ResSelect";
import "./formulaModal.css"
import TextInput from "../../../../Inputs/Text";
import { TableType } from "../../../../../../enums/tableType.enum";
import { useDispatch, useSelector } from "react-redux";
import { addReadyResource, addResIn, addResOut, setValue } from "../../../../../../store/reducers/nodeResReducer";
import { BaseButton } from "../../../../Buttons/Base";
import { createNodeRes } from "../../../../../../services/nodeDetails";
import { toast } from "react-toastify";
import { formatNodeResToTable } from "../../../../../hooks/tableNodeResFormatter";
import { NodeRes } from "../../../../../../types/node";
import { NodeResType } from "../../../../../../types/resource";
import { FormulaInput } from "../../../../Inputs/Formula";

interface IProps {
    isOpen: boolean
    data: any[]
    onClose: () => void
}

export const ResFormulaModal = ({ isOpen, onClose, data }: IProps) => {
    //const keyboardRef = useRef(null);
    const [tableResources, setTableResources] = useState<ITableRes[]>([]);
    const dispatch = useDispatch();

    const formula = useSelector((state: any) => state.nodeRes.selectedResValue);
    const selectedRes = useSelector((state: any) => state.nodeRes.selectedResource);
    const resInOut = useSelector((state: any) => state.nodeRes.resInOut);
    const currentNodeId = useSelector((state: any) => state.nodeRes.nodeId);
    const resources = useSelector((state: any) => state.resource.resources);

    const onResourceClick = (item: any) => {
        dispatch(setValue((formula + item.sys_name)));
    }

    const onFormulaChange = (evt: any) => {
        dispatch(setValue(evt.target.value));
    }

    useEffect(() => {
        setTableResources(data.map((res) => { return { sys_name: res.sys_name, name: res.name } }))
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
        const nodeRes: NodeRes = {
            node_id: currentNodeId,
            res_id: selectedRes.id,
            model_id: Number(localStorage.getItem('modelId')),
            value: formula,
            res_in_out: resInOut,
        }


        dispatch(addReadyResource(nodeRes));

        const tableRes = formatNodeResToTable(nodeRes, resources);
        if (tableRes) {
            if (resInOut === NodeResType.IN)
                dispatch(addResIn(tableRes));
            else
                dispatch(addResOut(tableRes));
        }
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
                    {/* <input className="formula-input" type="text" value={formula} onChange={onFormulaChange} /> */}
                    <FormulaInput id="formula-input" value={formula} onChange={onFormulaChange} />
                    <Table data={tableResources} headers={["Систем. имя", "Наименование",]}
                        type={TableType.Select}
                        onItemClick={onResourceClick} />
                    <BaseButton text="Применить формулу" onClick={onNodeResSave} className="modal-save-btn" />
                </div>
            }
        />
    )
}