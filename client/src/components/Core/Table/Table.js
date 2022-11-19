import { useEffect, useState, createContext } from "react";
import ItemModal from "../../Item/ItemModal";
import "./Table.css";
import { Form, Modal, Button } from "react-bootstrap";
import TableGrid from "./TableGrid";
import useCoreTable from "./coreTable";


const CoreTable = (props) => {
    const {apiService, parentRow, modalProp, title} = props

    const coreData = useCoreTable({apiService, parentRow})

    const {data,
        checkedRows,
        show,
        isInEdit,
        editRow,
        showDeleteNotification,
        setShowDeleteNotification,
        handleClose,
        handleShow,
        deleteCheckedRows,
        handleDeleteNoticiationClose} = coreData;

    return (
        <div className="Table">
            <ItemModal handleClose={handleClose} modalProp={modalProp} isInEdit={isInEdit} show={show} apiService={apiService} rowData={editRow} parentId={parentRow?._id} title={title}></ItemModal>
            <Modal show={showDeleteNotification} onHide={handleDeleteNoticiationClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">Delete {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete <b>{checkedRows?.length}</b> {title}/s
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteNoticiationClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteCheckedRows}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            {data && data.length > 0 && (
                <>
                    <div className="table-action-bar">
                        <i className="fa-solid fa-circle-plus" onClick={() => handleShow(false)}></i>
                        <i className="fa-solid fa-circle-minus" onClick={() => checkedRows.length > 0 && setShowDeleteNotification(true)}></i>
                    </div>
                    <TableGrid {...coreData} {...props}></TableGrid>
                </>
            )}
            {(!data || data.length < 0) && (
                <div>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            )}
        </div>
    );
}

    
export default CoreTable;
