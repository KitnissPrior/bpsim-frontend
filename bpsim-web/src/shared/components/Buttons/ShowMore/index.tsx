import "./openButton.css"
interface IProps {
    theme:
    | 'primary'
    | 'secondary'
    onClick?: () => void
    disabled?: boolean
}

export const ShowMoreButton = ({ onClick, theme, ...props }: IProps) => {

    return (
        <button className={`show-more-button`} data-theme={theme} onClick={onClick}
            type='button' disabled={props.disabled} />
    )
}