import { useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import itemFieldApi from "../../services/itemFieldApi";
import ItemModal from "./ItemModal";

function ItemField({row, setRow}) {
    // const [show, setShow] = useState(false);
    // const [itemFields, setItemFields] = useState([]);
    // const [fieldId, setFieldId] = useState();
    // const [fieldProp, setFieldProp] = useState();
    // const [isInEdit, setIsInEdit] = useState(false);

    // const fieldConf = [
    //     'Name.Text',
    //     'Description.Text',
    //     'DataType.Select.Name'
    // ]

    // const DataType = [
    //     {Name: "Text"},
    //     {Name: "Select"}
    // ]

    // const handleClose = () => setShow(false);
    // const handleShow = (isInEdit, row = null) => {
    //     setIsInEdit(isInEdit);
    //     const data = fieldConf.map((e)=>{
    //         return {
    //             Name: e.split('.')[0],
    //             Value: row ? row[e.split('.')[0]]: '',
    //             ControlType: e.split('.')[1]
    //         }
    //     })
    //     setFieldProp(data)
    //     setFieldId(row?.rowData._id)
    //     setShow(true);
    // }
    // useEffect(() => {
    //     const getData = async function () {
    //         const data = await itemFieldApi.get(row.rowData._id);
    //         setItemFields(data.data);
    //     };
    //     if(row.rowData) getData();
    // }, []);
    return (
        
        <div className="ItemGroup">


            
            {/* {row.rowData && (<i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false,{...row, DataType})}></i>)}
            <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} fieldProp={fieldProp} apiService={itemFieldApi} parentId={fieldId} title="Item Field"></ItemModal>
            {itemFields && row.rowData && (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>DataType</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemFields &&
                            itemFields.map((field, i) => {
                                return (
                                    <tr
                                        key={i}
                                        onClick={() =>
                                            setRow({
                                                index: i,
                                                rowData: field,
                                            })
                                        }
                                    >
                                        <td>{i + 1}</td>
                                        <td>{field.Name}</td>
                                        <td>{field.Description}</td>
                                        <td>{field.DataType}</td>
                                    </tr>
                                );
                            })}
                        {itemFields && itemFields.length <= 0 && (
                            <tr>
                                <td colSpan={4}>No data...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )} */}
        </div>
    );
}

export default ItemField;
