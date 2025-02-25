import "./baseButton.css"

interface IProps {
    text: string,
    onClick?: () => void
}

export const BaseButton = ({text, onClick} : IProps)=> {
    return (
        <button className="base-button" onClick={onClick}>{text}</button>
    )
}