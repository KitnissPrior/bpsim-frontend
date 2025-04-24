type DropdownItem = {
    label: string;
    onClick: () => void
    disabled?: boolean
}

export type DropdownProps = {
    title: string
    data1: DropdownItem[]
    data2?: DropdownItem[]
}