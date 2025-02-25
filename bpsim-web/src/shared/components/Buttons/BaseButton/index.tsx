import "./baseButton.css"

interface IProps {
    text: string,
    className?: string,
    onClick?: () => void
}

export const BaseButton = ({ text, onClick, className }: IProps) => {
    return (
        <button className={`base-button ${className}`} onClick={onClick}>{text}</button>
    )
}