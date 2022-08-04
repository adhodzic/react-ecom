import { useEffect, useState } from "react";
import ItemModal from "../Item/ItemModal"
import itemGroupApi from "../../services/itemGroupApi";
import apiService from "../../services/itemApi";
import ItemCard from "./ItemCard";
function ItemList(){
    const [show, setShow] = useState(false);
    const [itemGroups, setItemGroups] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [itemList, setItemList] = useState();
    const [fieldId, setFieldId] = useState();
    const [fieldProp, setFieldProp] = useState();
    const [isInEdit, setIsInEdit] = useState(false);

    const fieldConf = [
        'Name.Text',
        'ItemGroup.Select.Name'
    ]

    useEffect(()=>{
        async function getItemGroups(){
            const data = await itemGroupApi.get();
            setItemGroups({ItemGroup: data.data.docs});
        }
        async function getItems(){
            const data = await apiService.get();
            setItemList(data.data.docs)
        }
        getItemGroups();
        getItems();
    },[])

    const handleClose = () => setShow(false);
    const handleShow = (isInEdit, fieldData = null) => {
        console.log(fieldData)
        setIsInEdit(isInEdit);
        const data = fieldConf.map((e)=>{
            console.log(e)
            console.log(e.split('.')[2])
            return {
                Name: e.split('.')[0], //take string before dot
                Value: fieldData[e.split('.')[0]]?fieldData[e.split('.')[0]]:'',
                ControlType: e.split('.')[1] //take string after dot
            }
        })
        setFieldProp(data)
        //setFieldId(row?._id)
        
        setShow(true);
    }

    return(
        <div className="ItemList">
            <div>
                <i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false, itemGroups)}></i>
                <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} apiService={apiService} fieldProp={fieldProp} id={fieldId} title="Item"></ItemModal>
            </div>
            <div className="item-list">
                {itemList && (itemList.map((item)=>{
                    return (<ItemCard data={item}></ItemCard>)
                }))}
            </div>
        </div>
    )
}

export default ItemList