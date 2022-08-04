import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import apiService from "../../services/itemGroupApi";
import ItemModal from "./ItemModal";
function ItemGroup(props) {
    const [show, setShow] = useState(false);
    const [itemGroups, setItemGroups] = useState();
    const [groupId, setGroupId] = useState();
    const [fieldProp, setFieldProp] = useState();
    const [isInEdit, setIsInEdit] = useState(false);

    const fieldConf = [
        'Name.Text',
        'Description.Text'
    ]

    const handleClose = () =>{
        setShow(false);
    } 
    const handleShow = (isInEdit, row = null) => {
        setIsInEdit(isInEdit);
        const data = fieldConf.map((e)=>{
            return {
                Name: e.split('.')[0],
                Value: row ? row[e.split('.')[0]]: '',
                ControlType: e.split('.')[1]
            }
        })
        setFieldProp(data)
        setGroupId(row?._id)
        
        setShow(true);
    }

    useEffect(() => {
        const getData = async function () {
            const data = await apiService.get();
            setItemGroups(data.data.docs);
        };
        getData();
    }, []);

    return (
        
        <div className="ItemGroup">
            
            <i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false)}></i>
            <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} fieldProp={fieldProp} apiService={apiService} id={groupId} title="Item Group"></ItemModal>
            {itemGroups && (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>
                                Edit
                            </th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemGroups &&
                            itemGroups.map((item, i) => {
                                return (
                                    <tr
                                        key={i}
                                        onClick={() =>
                                            props.setRow({
                                                index: i,
                                                rowData: item,
                                            })
                                        }
                                    >
                                        <td><i className="fa-solid fa-pen-to-square" onClick={()=>handleShow(true, item)}></i></td>
                                        <td>{item.Name}</td>
                                        <td>{item.Description}</td>
                                    </tr>
                                );
                            })}
                        {itemGroups && itemGroups.length <= 0 && (
                            <tr>
                                <td colSpan={3}>No data...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ItemGroup;
