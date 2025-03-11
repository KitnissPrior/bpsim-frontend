import "./contextModel.css"

interface IProps {
    onModelAdd: () => void
}

export const ModelContextMenu = ({ onModelAdd }: IProps) => {
    return (
        <div className="model-context-menu text--body-xs" onClick={onModelAdd}>+ Добавить модель</div>
    )
}