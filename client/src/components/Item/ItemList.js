import { useEffect, useState } from "react";
import ItemModal from "../Item/ItemModal"
import itemGroupApi from "../../services/itemGroupApi";
import apiService from "../../services/itemApi";
import ItemCard from "./ItemCard";
import './ItemList.css';

function ItemList(){
    const [show, setShow] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [itemList, setItemList] = useState();
    const [isInEdit, setIsInEdit] = useState(false);

    const itemProp = {
        Name: {
            ControlType: "Text"
        },
        ItemGroup: {
            ControlType: "Select",
            DataSource: itemGroupApi
        }
    }

    useEffect(()=>{
        async function getItems(){
            const data = await apiService.get();
            setItemList(data.data.docs)
        }

        getItems();
    },[])

    const handleClose = () => setShow(false);
    const handleShow = (isInEdit) => {
        setIsInEdit(isInEdit);        
        setShow(true);
    }

    return(
        <div className="ItemList">
            <div className="item-actionbar">
                <h1>Items</h1>
                <i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false)}></i>
                <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} apiService={apiService} modalProp={itemProp} title="Item"></ItemModal>
            </div>
            <div className="item-list">
                {itemList && (itemList.map((item)=>{
                    return (<ItemCard key={item._id} data={item}></ItemCard>)
                }))}
            </div>
        </div>
    )
}

export default ItemList