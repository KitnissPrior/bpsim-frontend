interface IProps {
    onDelete: () => void
    onPropsOpen: () => void
    onClose: () => void
}

export const NodeContextMenu = (props: IProps) => {
    return (
        <>
            <div className="context-menu-item text--body-xs" onClick={props.onClose}>Закрыть</div>
            <div className="context-menu-item text--body-xs">Переименовать</div>
            <div className="context-menu-item text--body-xs" onClick={props.onPropsOpen}>Свойства</div>
            <hr className="context-menu-hr" />
            <div onClick={props.onDelete} className="context-menu-item text--body-xs">Удалить</div>
        </>
    )
}