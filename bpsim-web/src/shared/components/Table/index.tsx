import { insertNull } from "../../../shared/hooks/numbersFormatter";
import "./table.css"

interface IProps {
    headers: string[];
    data: any[];
}

export const Table = ({ data, headers }: IProps) => {
    return (
        <table className="table table-bordered table-container">
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
                        <tr >
                            <th scope="row" className="table-data">{insertNull(index)}</th>
                            {item.map((value: any, index: any) => {
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
                    <td onClick={() => { }} className="table-add-cell table-data">+</td>
                </tr>
            </tbody>
        </table>
    )
}