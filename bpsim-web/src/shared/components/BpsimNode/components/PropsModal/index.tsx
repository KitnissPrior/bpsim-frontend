import { Modal } from "react-bootstrap"
import "./propsModal.css"
import { useEffect, useRef, useState } from "react"
import { MainPage } from "./MainPage"
import { ResPage } from "./ResPage"
import NavigationTab from "../../../NavigationTab"
import { NodePropsTab } from "../../../../../enums/nodeProps.enum"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNodeTab } from "../../../../../store/reducers/nodeDetailsReducer"
import { setNodeId, setNodeResources } from "../../../../../store/reducers/nodeResReducer"
import { getNodeResources } from "../../../../../services/nodeRes.service"
import { NodeResType } from "../../../../../types/resource"
import { formatNodeResourcesToTable } from "../../../../hooks/tableNodeResFormatter"
import { setTableResourcesIn, setTableResourcesOut } from "../../../../../store/reducers/nodeResReducer"
import { setResources } from "../../../../../store/reducers/resourceRedicer"
import { getResources } from "../../../../../services/resource.service"
import ConfirmModal from "../../../Modals/Confirm"

interface IProps {
    isOpen: boolean
    node_id: number
    details: any
    onClose: () => void
}

export const NodePropsModal = ({ isOpen, node_id, details, onClose }: IProps) => {
    const modalRef = useRef(null);
    const [confirmCloseVisible, setConfirmCloseVisible] = useState(false);

    const activeTab = useSelector((state: any) => state.nodeDetails.activeTab);
    const resources = useSelector((state: any) => state.resource.resources);
    const newResources = useSelector((state: any) => state.nodeRes.newResources);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveNodeTab(NodePropsTab.Main));
        dispatch(setNodeId(node_id));

        if (resources.length === 0) {
            getResources(Number(localStorage.getItem('subjectAreaId')))
                .then((response: any) => {
                    if (response.status === 200) {
                        dispatch(setResources(response.data));
                    }
                });
        }
        else {
            getNodeResources(node_id).then((response: any) => {
                if (response.status === 200 && response.data.length > 0) {
                    dispatch(setNodeResources(response.data));
                    dispatch(setTableResourcesIn(
                        formatNodeResourcesToTable(response.data, resources, NodeResType.IN)));
                    dispatch(setTableResourcesOut(
                        formatNodeResourcesToTable(response.data, resources, NodeResType.OUT)));
                }
            })
        }
    }, []);

    const onCheckUnsavedResources = () => {
        if (newResources.length > 0) {
            setConfirmCloseVisible(true);
        }
        else onClose();
    }

    const onConfirmCloseHide = () => {
        setConfirmCloseVisible(false);
    }

    return (
        <>
            <Modal show={isOpen} ref={modalRef} keyboard={false} backdrop='static' enforceFocus={false}
                className="">
                <div className="modal-content node-props-modal">
                    <div className="modal-header node-props-modal-header">
                        <div className="modal-title node-props-title">Свойства узла</div>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal" aria-label="Закрыть" onClick={onCheckUnsavedResources} />
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
                            <ResPage onClose={onClose} />
                        }
                    </div>
                </div>
            </Modal>
            <ConfirmModal isOpen={confirmCloseVisible}
                okText="Да, закрыть"
                content={`У вас есть несохраненные изменения в разделе "Ресурсы"! Точно хотите закрыть окно?`}
                onOk={onClose} onCancel={onConfirmCloseHide} />
        </>
    )
}