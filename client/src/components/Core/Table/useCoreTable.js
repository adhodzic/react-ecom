import {useState, useEffect, useMemo} from 'react'

function useCoreTable({apiService, parentRow}) {
    const [data, setData] = useState();
    const [checkedRows, setCheckdRows] = useState([]);
    const [show, setShow] = useState(false);
    const [isInEdit, setIsInEdit] = useState(false);
    const [editRow, setEditRow] = useState();
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);

    const loadData = async function () {
        const apiData = await apiService.get(parentRow?._id);
        setData(apiData);
        console.log(apiData)
    }

    const handleClose = () => setShow(false);

    const handleShow = (edit, row = null) => {
        setIsInEdit(edit);
        setEditRow(row);
        setShow(true);
    };

    const deleteCheckedRows = async () => {
        const ids = checkedRows.map((row) => {
            return row._id;
        });
        console.log(ids);
        await apiService.delete(ids);
        setShowDeleteNotification(false);
    };

    const handleDeleteNoticiationClose = () => {
        setShowDeleteNotification(false);
    };

    const addToCheckedList = (e, row) => {
        //Check if row is already in checked array
        let rowExists = checkedRows.some((item) => item?._id == row._id);

        //If row is already in array and if row is checked then do nothing
        if (rowExists && e.target.checked) return;

        //If row is not in array and row is checked then add row in array
        if (!rowExists && e.target.checked) setCheckdRows([...checkedRows, row]);

        //If row is in array and row is unchecked then remove row from array
        if (rowExists && !e.target.checked) {
            let filterdArray = checkedRows.filter((checkedRow) => {
                return checkedRow !== row;
            });
            setCheckdRows(filterdArray);
        }
    };

    const checkAll = (e) => {
        e.target.checked ? setCheckdRows([...data]) : setCheckdRows([]);
    };

    const getTableHeaders = () => {
        if(!data) return []
        const headerArray = Object.keys(data[0]);
        const filteredHeades = headerArray.filter((header) => header != "_id" && !header.includes("_v"));
        return filteredHeades;
    };

    useMemo(()=>{
        loadData();
    },[show, parentRow])

  return {
    data,
    checkedRows,
    show,
    isInEdit,
    editRow,
    showDeleteNotification,
    setShowDeleteNotification,
    setShow,
    handleClose,
    handleShow,
    deleteCheckedRows,
    addToCheckedList,
    checkAll,
    getTableHeaders,
    handleDeleteNoticiationClose,
    loadData
  }
}

export default useCoreTable;

