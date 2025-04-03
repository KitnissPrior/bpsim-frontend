import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import TextError from "../../Errors/TextError"
import { useState } from "react"
import "./formulaInput.css"

export interface ITextInputProps {
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    containerClassName?: string
    placeholder?: string
    id: string
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    register?: any
}

export const FormulaInput = (props: ITextInputProps) => {
    return (
        // <div className={props.containerClassName}>
        <input type="text" className="formula-input"
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            {...props.register}
            disabled={props.disabled}
            onChange={props.onChange}
        />)
    {/*props.error?.message && <TextError text={props.error.message.toString() || ''} />*/ }
    //</div> )
}