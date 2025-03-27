import "./contextAdd.css"

interface IProps {
    onAdd: () => void
    text: string
    className?: string
}

export const ContextAdd = ({ onAdd, text, className }: IProps) => {
    return (
        <div className={`context-menu-add text--body-xs ${className}`} onClick={onAdd}>{text}</div>
    )
}