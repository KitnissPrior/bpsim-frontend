import ContextMenu from "../../ContextMenu";
import "./contextProps.css"

interface IProps {
    onDelete: () => void
    onRename?: () => void
}

export const ModelProps = ({ onDelete }: IProps) => {
    return (
        <ContextMenu
            className="model-context-menu"
            children={
                <>
                    <div>Переименовать</div>
                    <hr className="context-menu-hr" />
                    <div onClick={() => onDelete()}>Удалить</div>
                </>
            }
        />
    )
}