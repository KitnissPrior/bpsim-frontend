import "./console.css"

interface IProps {
    data: any[]
}

export const Console = ({ data }: IProps) => {
    return (
        <div className="console">
            <div className="text--body-xs console-title">Консоль</div>
            <div className="console-divider" />
            <div className="column-block console-data">
                {data.map((item, index) => <div className="text--body-xs" key={index}>{item}</div>)}
            </div>
        </div>
    )
}