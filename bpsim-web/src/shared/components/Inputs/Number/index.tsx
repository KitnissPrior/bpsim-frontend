import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import TextError from "../../Errors/TextError"
import { useState } from "react"

export interface IProps {
    defaultValue?: number
    disabled?: boolean
    containerClassName?: string
    placeholder: string
    id: string
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    register: any
}

const NumberInput = (props: IProps) => {
    const [value, setValue] = useState(props.defaultValue);
    const onChange = (evt: any) => {
        setValue(Number(evt.target.value));
    };
    return (
        <div className={"mb-3" + " " + props.containerClassName}>
            <input type='number' className="form-control input-number"
                id={props.id}
                placeholder={props.placeholder}
                value={value}
                step="any"
                {...props.register}
                disabled={props.disabled}
                onChange={onChange}
            />
            {props.error?.message && <TextError text={props.error.message.toString() || ''} />}
        </div>
    )
}

export default NumberInput;