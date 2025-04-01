import { useEffect, useState, useRef } from "react";
import FormModal from "../../../../Modals/Form";
import KioskBoard from "kioskboard";
import { Table } from "../../../../Table";
import { ITableRes } from "../ResSelect";
import "./formulaModal.css"

interface IProps {
    isOpen: boolean
    data: any[]
    onClose: () => void
}

export const ResFormulaModal = ({ isOpen, onClose, data }: IProps) => {
    const keyboardRef = useRef(null);
    const [resources, setResources] = useState<ITableRes[]>([]);

    useEffect(() => {
        setResources(data.map((res) => { return { sys_name: res.sys_name, name: res.name } }))
        if (keyboardRef.current) {
            KioskBoard.run(keyboardRef.current, {
                language: "en",
                theme: "light",
                keysArrayOfObjects: [
                    {
                        "0": "0",
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "+",
                        "11": "-",
                        "12": "*",
                        "13": "/",

                    },
                    {
                        "0": "^",
                        "1": "&",
                        "2": "?",
                        "3": "!",
                        "4": "=",
                        "5": "<",
                        "6": ">",
                        "7": "≤",
                        "8": "≥",
                        "9": "<>",
                        "10": "(",
                        "11": ")",
                        "12": "[",
                    },
                ]
            });
        }
    }, [keyboardRef]);

    return (
        <FormModal isOpen={isOpen} onClose={onClose} title="Формула"
            content={
                <div className="formula-res-modal-body">
                    <input
                        className="inputFromKey"
                        ref={keyboardRef}
                        type="text"
                        data-kioskboard-type="keyboard"
                        placeholder="" />
                    <Table data={resources} headers={["Систем. имя", "Наименование",]}
                        selectable={true} onAdd={() => { }} />
                </div>
            }
        />
    )
}