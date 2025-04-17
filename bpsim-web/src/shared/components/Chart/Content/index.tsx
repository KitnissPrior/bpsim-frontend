import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./chartContent.css"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

interface IProps {
    data?: any[]
}

export const ChartContent = ({ data }: IProps) => {
    const xLegend = useSelector((state: any) => state.chart?.currentXLegend ?? 'X Axis');
    const yLegend = useSelector((state: any) => state.chart?.currentYLegend ?? 'Y Axis');

    const data2 = [
        {
            ['time']: 0,
            [yLegend]: "ресурс1",
        },
        {
            ['time']: 1,
            [yLegend]: "ресурс1",
        },
    ]

    const [values, setValues] = useState<any>(data2)

    useEffect(() => {
        if (data?.length) {
            const chartValues = data.map((item) =>
            ({
                ['time']: item.x,
                [yLegend]: item.y,
            })
            )
            setValues(chartValues)
        }
    }, [data]);

    try {
        return (
            <>
                <BarChart width={800} height={230} data={values}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={yLegend} fill="#8884d8" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </>
        );
    } catch (error) {
        console.error('Ошибка в компоненте GridLines:', error);
        return <div>Произошла ошибка при отображении графика</div>;
    }
}