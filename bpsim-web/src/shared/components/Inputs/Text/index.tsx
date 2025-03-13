import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import TextError from "../../Errors/TextError"
import { useState } from "react"

export interface ITextInputProps {
    defaultValue?: string
    disabled?: boolean
    containerClassName?: string
    placeholder: string
    type: string
    id: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    register?: any
}

const TextInput = (props: ITextInputProps) => {
    const [value, setValue] = useState(props.defaultValue);
    const onChange = (evt: any) => {
        setValue(evt.target.value);
    };
    return (
        <div className={"mb-3" + " " + props.containerClassName}>
            <input type={props.type} className="form-control input-text"
                id={props.id}
                placeholder={props.placeholder}
                value={value}
                {...props.register}
                disabled={props.disabled}
                onChange={onChange}
            />
            {props.error?.message && <TextError text={props.error.message.toString() || ''} />}
        </div>
    )
}

export default TextInput;