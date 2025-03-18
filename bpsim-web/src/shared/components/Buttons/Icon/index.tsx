import "./iconButton.css"
import { Tooltip } from "../../Tooltip";

interface IProps {
    placeholder: string,
    className?: string,
    onClick?: () => void
    type?:
    | 'submit'
    | 'button'
    iconPath: string,
    iconClassName: string
}

export const IconButton = ({ placeholder, onClick, className, ...props }: IProps) => {

    const Icon = () => props.iconPath ?
        <img src={props.iconPath} alt="icon" className={props.iconClassName} />
        : <div style={{ marginLeft: '-5px' }} />

    return (
        <Tooltip text={placeholder}>
            <button className={`icon-button ${className}`} onClick={onClick} type={props.type ? props.type : 'button'}>
                <Icon />
            </button>
        </Tooltip>
    )
}