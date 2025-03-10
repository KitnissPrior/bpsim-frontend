interface IProps {
    onClose?: () => void
    children?: React.ReactNode
}

const ContextMenu = (props: IProps) => {
    return (
        <div className="context-menu" onBlur={() => { }}>
            {props.children}
        </div>
    )
}

export default ContextMenu