import { Modal } from "react-bootstrap"
import "./propsModal.css"
import { useEffect, useRef } from "react"
import { MainPage } from "./MainPage"
import { ResPage } from "./ResPage"
import NavigationTab from "../../../NavigationTab"
import { NodePropsTab } from "../../../../../enums/nodeProps.enum"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNodeTab } from "../../../../../store/reducers/nodeDetailsReducer"

interface IProps {
    isOpen: boolean
    node_id: number
    details: any
    onClose: () => void
}

export const NodePropsModal = ({ isOpen, node_id, details, onClose }: IProps) => {
    const modalRef = useRef(null);
    const activeTab = useSelector((state: any) => state.nodeDetails.activeTab);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveNodeTab(NodePropsTab.Main));
    }, []);

    return (
        <Modal show={isOpen} ref={modalRef} keyboard={false} backdrop='static' enforceFocus={false}
            className="">
            <div className="modal-content node-props-modal">
                <div className="modal-header node-props-modal-header">
                    <div className="modal-title node-props-title">Свойства узла</div>
                    <button type="button" className="btn-close"
                        data-bs-dismiss="modal" aria-label="Закрыть" onClick={onClose} />
                </div>
                <div className="modal-body node-props-modal-body">
                    <div className="row-block">
                        <NavigationTab variant={NodePropsTab.Main} label="Основное" activeTab={activeTab}
                            handleTabChange={() => { dispatch(setActiveNodeTab(NodePropsTab.Main)) }} />
                        <NavigationTab variant={NodePropsTab.Resources} label="Ресурсы" activeTab={activeTab}
                            handleTabChange={() => { dispatch(setActiveNodeTab(NodePropsTab.Resources)) }} />
                    </div>
                    {activeTab === NodePropsTab.Main ?
                        <MainPage node_id={node_id} details={details} onClose={onClose} />
                        :
                        <ResPage node_id={node_id} onClose={onClose} />
                    }
                </div>
            </div>
        </Modal>
    )
}