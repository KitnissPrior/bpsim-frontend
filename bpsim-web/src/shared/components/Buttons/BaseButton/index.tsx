import "./baseButton.css"

interface IProps {
    text: string,
    className?: string,
    onClick?: () => void
    type?:
    | 'submit'
    | 'button'
}

export const BaseButton = ({ text, onClick, className, ...props }: IProps) => {
    return (
        <button className={`base-button ${className}`} onClick={onClick} type={props.type ? props.type : 'button'}>{text}</button>
    )
}