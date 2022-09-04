import { useEffect, useState } from 'react';
import {Card, Button, Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import itemFieldApiService from '../../services/itemFieldApi';
import itemApiService from '../../services/itemApi';
import './ItemDetails.css'
function ItemDetails({ data }) {
    const params = useParams()
    const [itemData, setItemData] = useState()
    const [fieldItemData, setFieldItemData] = useState()
    const [error, setError] = useState()
    useEffect(()=>{
        const getData = async function(){

            const itemData = await itemApiService.getOne(params.id)
            console.log(itemData)
            setItemData(itemData[0])
            const itemGroupId = itemData[0].ItemGroup?._id
            if(!itemGroupId) return setError("Missing ItemGroup for item")
            const fieldData = await itemFieldApiService.get(itemGroupId)
            setFieldItemData(fieldData)
            console.log(fieldData)
        }
        getData()
    },[])

    const getControlType = function(field){
        return(
            <>
            <Form.Label>{field.Name}</Form.Label>
            <Form.Control
                key={field._id}
                name={field.Name}
                type={field.DataType == 'String'?'text':'password'}
                placeholder={"Enter " + field.Name}/>
            </>
        )
    }
    return (
        <div className="ItemDetails">
            <h1>Item details</h1>
            {(fieldItemData && !error) && (fieldItemData.map((field)=>{
                return (
                    <Form.Group className="mb-3" controlId="itemGroupName">
                      {getControlType(field)}              
                    </Form.Group>
                )
            }))}
            {error && <p>{error}</p>}
        </div>
    );
}

export default ItemDetails;