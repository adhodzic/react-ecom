import { useEffect, useState } from "react";
import ItemModal from "../Item/ItemModal"
import itemGroupApi from "../../services/itemGroupApi";
import apiService from "../../services/itemApi";
import CoreCard from "../Core/Card/CoreCard"
import './ItemList.css';
import { Col, Row } from "react-bootstrap";

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
            <Row className="g-5">             
                {itemList && (itemList.map((item)=>{
                    return (
                        <>
                        <Col xs={8} sm={7} md={6} lg={4} xl={4} xxl={3}>
                            <CoreCard key={item._id} itemData={item}></CoreCard>
                        </Col>
                        </>
                        )
                }))}
            </Row>
        </div>
    )
}

export default ItemList