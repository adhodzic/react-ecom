import { useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import apiService from "../../services/itemFieldApi";
import ItemModal from "./ItemModal";
function ItemField({row, setRow}) {
    const [show, setShow] = useState(false);
    const [itemFields, setItemFields] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [fieldId, setFieldId] = useState();
    const [fieldProp, setFieldProp] = useState();
    const [isInEdit, setIsInEdit] = useState(false);

    const fieldConf = [
        'Name',
        'Description',
        'DataType'
    ]

    const handleClose = () => setShow(false);
    const handleShow = (isInEdit, row = null) => {
        setIsInEdit(isInEdit);
        const data = fieldConf.map((e)=>{
            return {
                Name: e,
                Value: row ? row[e]: '',
                ControlType: 'text'
            }
        })
        setFieldProp(data)
        setFieldId(row?._id)
        
        setShow(true);
    }
    useEffect(() => {
        const getData = async function () {
            const data = await apiService.get({ItemGroupId: row.rowData._id});
            setItemFields(data.data.docs);
        };
        if(row.rowData) getData();
    }, []);
    return (
        
        <div className="ItemGroup">
            
            {row.rowData && (<i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false)}></i>)}
            <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} fieldProp={fieldProp} apiService={apiService} id={fieldId}></ItemModal>
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
            )}
        </div>
    );
}

export default ItemField;
