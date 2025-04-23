import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownDivider } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./playButton.css"
import { useSelector } from 'react-redux';

interface IProps {
    onStartClick: () => void;
}

export const PlayDropDownButton = ({ onStartClick }: IProps) => {
    const nodes = useSelector((state: any) => state.node.bpsimItems);
    const tableForExport = useSelector((state: any) => state.chart.tableForExport);
    const simulationValues = useSelector((state: any) => state.chart.currentValues);

    const exportdata = [
        { firstName: 'Koriolan', lastName: 'Snow' },
        { firstName: 'Katniss', lastName: 'Everdeen' },
    ];

    return (
        <DropdownButton id="dropdown-basic" title="Проигрывание">
            <DropdownMenu aria-labelledby="dropdown-basic" className="play-button-dropdown-menu">
                <DropdownItem key={'start'} onClick={onStartClick} disabled={!nodes}>
                    Старт
                </DropdownItem>
                <DropdownDivider key="divider" />
                <CSVLink data={exportdata} filename="simulation.csv" className='csv-link'>
                    Скачать файл статистики .csv
                </CSVLink>
            </DropdownMenu>
        </DropdownButton>
    );
};