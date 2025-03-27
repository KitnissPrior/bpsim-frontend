import ContextMenu from "../../ContextMenu";
import "./context.css"

interface IProps {
    onDelete: () => void
    onAdd: () => void
    onEdit?: () => void
}

export const CustomResourceContext = ({ onDelete, onAdd }: IProps) => {
    return (
        <ContextMenu
            className="context-menu-props text--body-xs"
            children={
                <>
                    <div className="context-res-item">Редактировать</div>
                    <div className="context-res-item" onClick={onAdd}>Добавить новый</div>
                    <hr className="context-menu-hr" />
                    <div className="context-res-item" onClick={onDelete}>Удалить</div>
                </>
            }
        />
    )
}