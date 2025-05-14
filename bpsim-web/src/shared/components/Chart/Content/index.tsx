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
    const yLegend = useSelector((state: any) => state.chart?.currentYLegend ?? 'Y Axis');

    const defaultData = [
        {
            ['time']: 0,
            [yLegend]: "ресурс1",
        }
    ]

    const [values, setValues] = useState<any>(defaultData)

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
                <BarChart width={500} height={200} data={values}
                    margin={{ top: 5, right: 15, left: 0, bottom: 40 }}
                    barCategoryGap={'5%'} maxBarSize={60}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{
                        value: 'Время моделирования',
                        position: 'bottom',
                        offset: 15 // смещение в пикселях
                    }}
                        wordSpacing={-5}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        align='center'
                        wrapperStyle={{
                            top: -20,
                            left: 30,
                            fontSize: '18px'
                        }} />
                    <Bar dataKey={yLegend} fill="#33649c" />
                </BarChart>
            </>
        );
    } catch (error) {
        console.error('Ошибка в компоненте GridLines:', error);
        return <div>Произошла ошибка при отображении графика</div>;
    }
}