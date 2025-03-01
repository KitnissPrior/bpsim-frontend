import "./toolbar.css"

type ToolBarItem = {
    name: string;
    onClick?: () => void;
}

const Toolbar = () => {
    const toolbarItems: ToolBarItem[] = [
        { name: "Общие", onClick: () => console.log("Общие") },
        { name: "Справочники", onClick: () => console.log("Справочники") },
        { name: "Модель", onClick: () => console.log("Модель") },
        { name: "Вид", onClick: () => console.log("Вид") },
        { name: "Проигрывание", onClick: () => console.log("Проигрывание") },
        { name: "О программе", onClick: () => console.log("О программе") },
    ]
    return (
        <>
            <div className="toolbar">
                {toolbarItems.map((item, index) => (
                    <div className="toolbar-item" key={index} onClick={item.onClick}>{item.name}</div>
                ))}
            </div>
        </>
    )
}

export default Toolbar