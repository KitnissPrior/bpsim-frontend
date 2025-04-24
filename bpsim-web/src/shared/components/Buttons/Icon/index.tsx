import "./iconButton.css"
import { Tooltip } from "../../Tooltip";
import { useEffect } from "react";

interface IProps {
    placeholder: string,
    className?: string,
    onClick?: () => void
    type?:
    | 'submit'
    | 'button'
    iconPath: string,
    iconClassName: string
    disabled?: boolean
}

export const IconButton = ({ placeholder, onClick, className, ...props }: IProps) => {

    const Icon = () => props.iconPath ?
        <img src={props.iconPath} alt="icon" className={props.iconClassName}
            style={{
                opacity: props.disabled ? 0.7 : 1,
                cursor: props.disabled ? "not-allowed" : "pointer"
            }} />
        : <div style={{ marginLeft: '-5px' }} />

    return (
        <Tooltip text={placeholder}>
            <button className={`icon-button ${className}`}
                onClick={props.disabled ? undefined : onClick}
                type={props.type ? props.type : 'button'} disabled={props.disabled}>
                <Icon />
            </button>
        </Tooltip>
    )
}