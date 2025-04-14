import { BaseButton } from "../../Buttons/Base"
import { Select } from "../../Inputs/Select"
import TextInput from "../../Inputs/Text"
import FormModal from "../../Modals/Form"

interface IProps {
    name: string
    isOpen: boolean
    onClose: () => void
}

export const ChartPropsModal = ({ isOpen, onClose, ...props }: IProps) => {
    return (
        <FormModal isOpen={isOpen} onClose={onClose} title="Свойства диаграммы" content={
            <div>
                <div className="row-block">
                    <div>Название диаграммы</div>
                    <TextInput placeholder={""} type={"text"} id={"name"} defaultValue={props.name} />
                </div>
                <div className="row-block">
                    <div>Привязка к объекту</div>
                    <Select data={[{ id: 1, name: "Объект 1" }, { id: 2, name: "Объект 2" }]} title="Объект" onSelect={() => { }} />
                </div>
                <div className="row-block">
                    <div>Подпись по оси Х</div>
                    <TextInput placeholder={""} type={"text"} id={"axis-legend"} />
                </div>
                <div className="row-block">
                    <div>Подпись по оси Y</div>
                    <TextInput placeholder={""} type={"text"} id={"oxis-legend"} />
                </div>
                <BaseButton text="Сохранить" onClick={onClose} className="modal-save-btn" />
            </div>

        } />
    )
}