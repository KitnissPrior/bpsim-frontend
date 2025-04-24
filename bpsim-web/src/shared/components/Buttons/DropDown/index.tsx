import { DropdownProps } from "../../../../types/dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { DropdownDivider } from "react-bootstrap";
import "./dropdown.css"

export const DropDownButton = ({ title, data1, data2 }: DropdownProps) => {
    return (
        <DropdownButton id="dropdown-basic" title={title}>
            <DropdownMenu aria-labelledby="dropdown-basic" className="bpsim-dropdown-menu">
                {data1.map((item, index) =>
                    <DropdownItem key={index} onClick={item.onClick} disabled={item.disabled}>
                        {item.label}
                    </DropdownItem>
                )}
                {data2 && [
                    <DropdownDivider key="divider" />,
                    ...data2.map((item, index) =>
                        <DropdownItem key={`second-${index}`} onClick={item.onClick} disabled={item.disabled}>
                            {item.label}
                        </DropdownItem>
                    )
                ]}
            </DropdownMenu>
        </DropdownButton>
    );
};