import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

interface IProps {
    data?: any[]
}

export const ChartContent = ({ data }: IProps) => {
    const xLegend = useSelector((state: any) => state.chart?.currentXLegend ?? 'X Axis');
    const yLegend = useSelector((state: any) => state.chart?.currentYLegend ?? 'Y Axis');

    useEffect(() => {
        console.log(xLegend)
        console.log(yLegend)
    }, [data]);

    return (<XYPlot
        width={300}
        height={300}>
        {/* <HorizontalGridLines /> */}
        <LineSeries
            data={[
                { x: 1, y: 10 },
                { x: 2, y: 5 },
                { x: 3, y: 15 }
            ]} />
        <XAxis title={xLegend} tickValues={[1, 2, 3]} />
        <YAxis title={yLegend} tickValues={[1, 2, 3]} />
    </XYPlot>)
}