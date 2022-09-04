import { useEffect, useState } from "react"
import ItemModal from "../../Item/ItemModal"
import './Table.css'
import { Form, Modal, Button } from 'react-bootstrap'
function CoreTable({apiService, selectedRow, setSelectedRow, parentRow, modalProp, title}) {

    const [data, setData] = useState()

    const [checkedRows, setCheckdRows] = useState([]);

    const [show, setShow] = useState(false);

    const [isInEdit, setIsInEdit] = useState(false);

    const [editRow, setEditRow] = useState()

    const [showDeleteNotification, setShowDeleteNotification] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = (edit, row = null) => {
        setIsInEdit(edit)
        setEditRow(row)
        setShow(true);
    }

    useEffect(()=>{
        async function loadData(){
            const apiData = await apiService.get(parentRow?._id)
            setData(apiData)
        }
        loadData()

    },[parentRow, show, showDeleteNotification])

    const deleteCheckedRows = async () => {
        const ids = checkedRows.map((row)=>{
            return row._id
        })
        console.log(ids)
        await apiService.delete(ids)
        setShowDeleteNotification(false)
    }

    const handleDeleteNoticiationClose = () => {
        setShowDeleteNotification(false)
    }

    const addToCheckedList = (e, row) => {
        //Check if row is already in checked array
        let rowExists = checkedRows.some((item)=>item?._id == row._id)

        //If row is already in array and if row is checked then do nothing
        if(rowExists && e.target.checked) return

        //If row is not in array and row is checked then add row in array
        if (!rowExists && e.target.checked) setCheckdRows([...checkedRows, row])

        //If row is in array and row is unchecked then remove row from array
        if(rowExists && !e.target.checked){
            let filterdArray = checkedRows.filter((checkedRow) => {
                return checkedRow !== row
            })
            setCheckdRows(filterdArray)
        }
    }

    const checkAll = (e) =>{
        e.target.checked ? setCheckdRows([...data]) : setCheckdRows([])
    }

    const renderTableRows = (data) =>{
        const headers = getTableHeaders(data)
        return data.map((row) => {
         return(
             <tr key={row._id} className={selectedRow && selectedRow._id == row._id ? 'selected': ''} onClick={ ()=> setSelectedRow && setSelectedRow(row)}>
                <td>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>handleShow(true, row)}></i>
                </td>
                <td>
                    <Form.Check
                        inline
                        name="row"
                        checked={checkedRows.some((item) => item?._id === row._id)} 
                        onChange={e =>addToCheckedList(e, row)}
                    />        
                </td>
                 {headers.map((header) => {
                     return(
                         <td key={header}>{row[header]}</td>
                     )
                 })}
             </tr>
         )
        })
     }

    const renderTableHeaders = (data) =>{
        const headerArray = getTableHeaders(data)
        return  headerArray.map((header)=>{
            return (<th key={header}>{header}</th>)
        })     
    }

    const getTableHeaders = (data) => {
        const headerArray = Object.keys(data[0])
        const filteredHeades = headerArray.filter((header)=>header != '_id' && !header.includes("_v"))
        return filteredHeades
    }

    return(
    <div className="Table">
        <div className="table-action-bar">
            <i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false)}></i>
            <i className="fa-solid fa-circle-minus" onClick={()=>checkedRows.length > 0 && setShowDeleteNotification(true)}></i>
        </div>
        <ItemModal handleClose={handleClose} modalProp={modalProp} isInEdit={isInEdit} show={show} apiService={apiService} rowData={editRow} parentId={parentRow?._id} title={title}></ItemModal>
        <Modal show={showDeleteNotification} onHide={handleDeleteNoticiationClose} >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Delete {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete <b>{checkedRows.length}</b> {title}/s</p>
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
        {(data && data.length > 0) &&
        <>
        <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <Form.Check
                                inline
                                onChange={e => checkAll(e)}
                            />      
                        </th>
                        {renderTableHeaders(data)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows(data)}
                </tbody>
            </table>
        </>
        }
        {(!data || data.length <= 0) &&
            <div>
                <p>No Data found</p>
            </div>

        }
    </div>
    )
}

export default CoreTable;
