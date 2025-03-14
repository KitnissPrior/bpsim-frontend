import ContextMenu from "../../ContextMenu";
import "./contextProps.css"

interface IProps {
    onDelete: () => void
    onClose: () => void
    onRename?: () => void
}

export const ModelProps = ({ onDelete, onClose }: IProps) => {
    return (
        <ContextMenu
            className="context-menu-props text--body-xs"
            children={
                <>
                    <div onClick={onClose}>Закрыть</div>
                    <div>Переименовать</div>
                    <hr className="context-menu-hr" />
                    <div onClick={onDelete}>Удалить</div>
                </>
            }
        />
    )
}