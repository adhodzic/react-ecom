import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import itemFieldApiService from "../../services/itemFieldApi";
import itemApiService from "../../services/itemApi";
import itemDataService from "../../services/itemDataApi";
import "./ItemDetails.css";
function ItemDetails() {
    const params = useParams();
    const [isSubmiting, setIsSubmiting] = useState();
    const [fieldItemData, setFieldItemData] = useState();
    const [changedFields, setChangedFields] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [error, setError] = useState();

    const getItemData = async function () {
        const data = await itemDataService.get(params.id);
        setItemData(data)
        setChangedFields(data)
    };

    useEffect(() => {
        const getFieldsForItem = async function () {
            const item = await itemApiService.getOne(params.id);
            const itemGroupId = item[0].ItemGroup?._id;
            if (!itemGroupId) return setError("Missing ItemGroup for item");
            const fieldData = await itemFieldApiService.get(itemGroupId);
            setFieldItemData(fieldData);
        };
        getFieldsForItem();
        getItemData();
    }, []);

    const isEmptyOrSpaces = function(str){
        return str === null || str.match(/^ *$/) !== null;
    }
    const updateFieldOnChange = function(value, field){
        const updatedField = {
            ItemField: field._id,
            Item: params.id,
            Value: value
        }
        const changedFieldsWithoutUpdated = changedFields.filter((f) => {
            return f.ItemField != updatedField.ItemField
        })
        if(isEmptyOrSpaces(value)){
            setChangedFields([...changedFieldsWithoutUpdated])
            return
        }
        setChangedFields([...changedFieldsWithoutUpdated, updatedField])
    }

    const getControlType = function (field) {
        return (
            <>
                <Form.Label>{field.Name}</Form.Label>
                <Form.Control
                    key={field._id}
                    name={field.Name}
                    value={changedFields.find(item => item.ItemField == field._id)?.Value}
                    type={field.DataType == "String" ? "text" : "password"}
                    placeholder={"Enter " + field.Name}
                    onChange={(e) => updateFieldOnChange(e.target.value, field)}
                />
            </>
        );
    };

    const getFieldsForUpdate = function(){
        const data = changedFields.filter((field) => {
            return itemData.some(function(data) {
                return data.ItemField === field.ItemField && data.Value != field.Value;
              }); 
        })
        return data;
    }

    const getFieldsForCreate = function(){
        const data = changedFields.filter((field) => {
            return !itemData.some(function(data) {
                return data.ItemField === field.ItemField
              }); 
        })
        return data;
    }

    const submitData = async function(event){
        event.preventDefault();
        const update = getFieldsForUpdate();
        const create = getFieldsForCreate();
        if(!update?.length > 0 && !create?.length > 0) return
        setIsSubmiting(true);
        update.forEach(async (item) => {
            console.log(item.Value, item.ItemField)
            await itemDataService.update({...item})
        })
        create.forEach(async (item) => {
            console.log(item.Value, item.ItemField)
            await itemDataService.create({...item})
        })
        setIsSubmiting(false);
        getItemData();
    }
    return (
        <div className="ItemDetails">
            <h1>Item details</h1>
            <Form id="group-form" onSubmit={submitData}>
                {fieldItemData && changedFields &&
                    !error &&
                    fieldItemData.map((field) => {
                        return (
                            <Form.Group
                                key={field._id}
                                className="mb-3"
                                controlId="itemGroupName"
                            >
                                {getControlType(field)}
                            </Form.Group>
                        );
                    })}
                <Button
                    form="group-form"
                    type="submit"
                    variant="primary"
                    disabled={isSubmiting}
                >
                    Save
                </Button>
            </Form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default ItemDetails;
