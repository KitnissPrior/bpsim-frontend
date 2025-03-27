import { useState } from "react";
import TextError from "../../Errors/TextError";

interface IProps {
    data: any[];
    title: string
    onSelect: (value: any) => void
    register?: any
    error?: string
}

export const Select = ({ data, title, onSelect, error }: IProps) => {
    const [value, setValue] = useState("");

    const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(evt.target.value);
        onSelect(evt.target.value);
        console.log(evt.target.value);
    };

    return (
        <div className="column-block">
            <select
                className="form-select"
                aria-label={title}
                value={value}
                onChange={onChange}
            >
                <option value={""} />
                {data.map((item, index) =>
                    <option key={index} value={item.id}>{item.name}</option >
                )}
            </select>
            {error && <TextError text={error} />}
        </div>
    );
};