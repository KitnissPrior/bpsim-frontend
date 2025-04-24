import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownDivider } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';
import { exportToExcel } from '../../../../hooks/fileExport/excel';
import "./playButton.css"

interface IProps {
    onStartClick: () => void;
}

export const PlayDropDownButton = ({ onStartClick }: IProps) => {
    const nodes = useSelector((state: any) => state.node.bpsimItems);
    const simulationValues = useSelector((state: any) => state.simulation.values);

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
                    onClick={() => exportToExcel(simulationValues)}>
                    Скачать файл статистики .xlsx
                </DropdownItem>
            </DropdownMenu>
        </DropdownButton>
    );
};