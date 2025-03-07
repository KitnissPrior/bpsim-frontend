import "./nodeContext.css"

interface IProps {
    onDelete: () => void
    onPropsClose?: () => void
}

const NodeContextMenu = (props: IProps) => {
    return (
        <div className="node-context-menu">
            <div onClick={props.onPropsClose} className="context-item">Закрыть</div>
            <hr />
            <div className="context-item">Свойства</div>
            <hr />
            <div onClick={props.onDelete} className="context-item">Удалить</div>
        </div>
    )
}

export default NodeContextMenu