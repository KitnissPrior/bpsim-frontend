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
    const simulationValues = useSelector((state: any) => state.simulation.values);
    //const simulationValues = useSelector((state: any) => state.chart.currentValues);

    const exportdata = [
        ['firstname', 'lastname'],
        ['Koriolan', 'Snow'],
        ['Katniss', 'Everdeen'],
    ];

    return (
        <DropdownButton id="dropdown-basic" title="Проигрывание">
            <DropdownMenu aria-labelledby="dropdown-basic" className="play-button-dropdown-menu">
                <DropdownItem key={'start'} onClick={onStartClick} disabled={!nodes}>
                    Старт
                </DropdownItem>
                <DropdownDivider key="divider" />
                {simulationValues.length === 0 ?
                    <DropdownItem key={'csv'} disabled={true}>
                        Скачать файл статистики .csv
                    </DropdownItem>
                    :
                    <CSVLink data={simulationValues} filename="simulation.csv"
                        className='csv-link'>
                        Скачать файл статистики .csv
                    </CSVLink>}
                <DropdownItem key={'xlsx'} disabled={simulationValues.length === 0}
                    onClick={() => console.log(simulationValues)}>
                    Скачать файл статистики .xlsx
                </DropdownItem>
            </DropdownMenu>
        </DropdownButton>
    );
};