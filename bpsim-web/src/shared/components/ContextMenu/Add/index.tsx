import "./contextAdd.css"

interface IProps {
    onAdd: () => void
    text: string
}

export const ContextAdd = ({ onAdd, text }: IProps) => {
    return (
        <div className="context-menu-add text--body-xs" onClick={onAdd}>{text}</div>
    )
}