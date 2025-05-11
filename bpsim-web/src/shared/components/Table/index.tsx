import { TableType } from "../../../enums/tableType.enum";
import { insertNull } from "../../../shared/hooks/numbersFormatter";
import "./table.css"

interface IProps {
    type: TableType
    headers: string[];
    data: any[];
    onItemClick?: (item: any) => void
    onDoubleClick?: () => void
    onAdd?: () => void
}

export const Table = ({ data, headers, onItemClick, type, onAdd }: IProps) => {
    return (
        <table className={`table table-bordered table-container ${type == TableType.Select ? "table-hover" : ""}`}>
            <thead>
                <tr >
                    <th scope="col" className="filled-cell"></th>
                    {headers?.map((header, index) =>
                        <th scope="col" className="table-data filled-cell" key={index}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr onClick={() => onItemClick && onItemClick(item)} key={"row" + index}>
                            <th scope="row" className="table-data filled-cell">{insertNull(index)}</th>
                            {Object.values(item).map((value: any, index: any) => {
                                return (
                                    <td className="table-data" key={index}>{value}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                {type == TableType.SelectAdd && <tr>
                    <th scope="row" className="table-data filled-cell">{insertNull(data.length)}</th>
                    <td></td>
                    <td onClick={onAdd} className="table-add-cell table-data">+</td>
                </tr>}
            </tbody>
        </table>
    )
}