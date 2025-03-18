import { useEffect, useRef } from "react";

interface IProps {
    onClose?: () => void
    children?: React.ReactNode
    className?: string
}

const ContextMenu = (props: IProps) => {

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleBlur = (event: FocusEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
                props.onClose?.();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
                props.onClose?.();
            }
        };

        if (menuRef.current) {
            menuRef.current.addEventListener('blur', handleBlur);
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            if (menuRef.current) {
                menuRef.current.removeEventListener('blur', handleBlur);
            }
            document.removeEventListener('click', handleClickOutside);
        };
    }, [props.onClose]);

    return (
        <div className={"context-menu" + ` ${props.className ? props.className : ""}`} ref={menuRef} tabIndex={10}>
            {props.children}
        </div>
    )
}

export default ContextMenu