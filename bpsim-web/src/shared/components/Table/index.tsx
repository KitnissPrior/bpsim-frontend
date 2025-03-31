import { insertNull } from "../../../shared/hooks/numbersFormatter";
import "./table.css"

interface IProps {
    selectable?: boolean
    headers: string[];
    data: any[];
    onItemClick?: (item: any) => void
    onDoubleClick?: () => void
    onAdd?: () => void
}

export const Table = ({ data, headers, onItemClick, selectable, onAdd }: IProps) => {
    return (
        <table className={`table table-bordered table-container ${selectable ? "table-hover" : ""}`}>
            <thead>
                <tr >
                    <th scope="col"></th>
                    {headers?.map((header, index) =>
                        <th scope="col" className="table-data" key={index}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr onClick={() => onItemClick && onItemClick(item)} key={"row" + index}>
                            <th scope="row" className="table-data">{insertNull(index)}</th>
                            {Object.values(item).map((value: any, index: any) => {
                                return (
                                    <td className="table-data" key={index}>{value}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                <tr>
                    <th scope="row" className="table-data">{insertNull(data.length)}</th>
                    <td></td>
                    <td onClick={onAdd} className="table-add-cell table-data">+</td>
                </tr>
            </tbody>
        </table>
    )
}