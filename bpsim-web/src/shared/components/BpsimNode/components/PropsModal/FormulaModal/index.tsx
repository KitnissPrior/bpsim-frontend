import { useEffect, useState } from "react";
import FormModal from "../../../../Modals/Form";
import { Table } from "../../../../Table";
import { ITableRes } from "../ResSelect";
import "./formulaModal.css"
import { TableType } from "../../../../../../enums/tableType.enum";
import { useDispatch, useSelector } from "react-redux";
import { addReadyResource, addResIn, addResOut, setValue } from "../../../../../../store/reducers/nodeResReducer";
import { BaseButton } from "../../../../Buttons/Base";
import { formatNodeResToTable } from "../../../../../hooks/tableNodeResFormatter";
import { NodeRes } from "../../../../../../types/node";
import { NodeResType } from "../../../../../../types/resource";
import { FormulaInput } from "../../../../Inputs/Formula";
import { useForm } from "react-hook-form";
import { formulaSchema } from "../../../../../hooks/validation/formula";
import { yupResolver } from "@hookform/resolvers/yup";
import TextError from "../../../../Errors/TextError";

interface IProps {
    isOpen: boolean
    data: any[]
    onClose: () => void
}

interface Formula {
    value: string
}

export const ResFormulaModal = ({ isOpen, onClose, data }: IProps) => {
    //const keyboardRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Formula | any>({
        resolver: yupResolver(formulaSchema)
    });
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
        const text_without_spaces = evt.target.value.replace(/\s+/g, '');
        dispatch(setValue(text_without_spaces));
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
                <form className="formula-res-modal-body" onSubmit={handleSubmit(onNodeResSave)}>
                    {/* {<input
                        className="inputFromKey"
                        ref={keyboardRef}
                        type="text"
                        data-kioskboard-type="keyboard"
                        placeholder="" />} */}
                    {/* <input className="formula-input" type="text" value={formula} onChange={onFormulaChange} /> */}
                    <Table data={tableResources} headers={["Систем. имя", "Наименование",]}
                        type={TableType.Select}
                        onItemClick={onResourceClick} />
                    <div className="formula-container">
                        <FormulaInput id="formula-input" value={formula} onChange={onFormulaChange}
                            register={register('value')} />
                        <TextError text={errors.value?.message?.toString() || ''} />
                    </div>

                    <BaseButton text="Применить формулу" type="submit" className="modal-save-btn" />
                </form>
            }
        />
    )
}