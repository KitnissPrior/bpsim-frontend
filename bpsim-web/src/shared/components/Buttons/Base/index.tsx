import { useState } from "react"
import "./baseButton.css"

interface IProps {
    text: string,
    className?: string,
    onClick?: () => void
    type?:
    | 'submit'
    | 'button'
    iconPath?: string,
    iconClassName?: string
}

export const BaseButton = ({ text, onClick, className, ...props }: IProps) => {
    const [iconPath] = useState(props.iconPath)

    const Icon = () => props.iconPath ?
        <img src={iconPath} alt="icon" className={"btn-icon " + props.iconClassName} />
        : <div style={{ marginLeft: '-5px' }} />

    const IconPlusText = () =>
        <>
            <Icon />
            {text}
        </>

    return (
        <button className={`base-button ${className}`} onClick={onClick} type={props.type ? props.type : 'button'}>
            {iconPath ? <IconPlusText /> : text}
        </button>
    )
}