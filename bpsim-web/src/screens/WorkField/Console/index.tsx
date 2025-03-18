import "./console.css"

interface IProps {
    data: any[]
}

export const Console = ({ data }: IProps) => {
    return (
        <div className="console">
            <div>Консоль</div>
            <div className="column-block">
                {data.map((item, index) => <div className="text--body-xs" key={index}>{item}</div>)}
            </div>
        </div>
    )
}