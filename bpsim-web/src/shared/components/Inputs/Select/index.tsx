import { useState } from "react";
import TextError from "../../Errors/TextError";

interface IProps {
    data: any[];
    title: string
    onSelect: (value: any) => void
}

export const Select = ({ data, title, onSelect }: IProps) => {
    const [value, setValue] = useState(" ");

    const onChange = (evt: any) => {
        setValue(evt.target.value);
        onSelect(evt.target.value);
    }
    return (
        <>
            <select className="form-select" aria-label={title} value={value} onChange={onChange}>
                <option>{" "}</option>
                {data.map((item, index) =>
                    <option key={index} value={item.id}>{item.name}</option>)
                }
            </select>
            <TextError text={""} />
        </>
    )
}