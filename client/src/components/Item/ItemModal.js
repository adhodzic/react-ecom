import { useEffect, useState } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
function ItemModal({handleClose, show, isInEdit, fieldProp, apiService, parentId, title}) {
    //props needed for modal are:
    //  isInEdit(true/false)
    //  fieldProp(Array of Objects containing Field name, ControlType and Data if exits)
    const [fieldData, setFieldData] = useState()
    const [isSubmiting, setIsSubmiting] = useState(false);
    useEffect(()=>{
        if(fieldProp) setFieldData([...fieldProp])
    },[fieldProp,show])

    const updateFieldOnChange = function(newValue, fieldName){
        const newFieldValue = fieldData.find((field, i) => {
            if (field.Name === fieldName) {
                // if(field.ControlType == 'Select'){
                //     let selectedOption = o.Value.find((option, i)=>{
                //         if(option.Name === newValue) return true
                //     })
                //     fieldData[i] = { Name: o.Name, Value: selectedOption, ControlType: o.ControlType };
                // }else{
                //fieldData[i] = { Name: field.Name, Value: newValue, ControlType: field.ControlType };
                //}
                
                return true; // stop searching
            }
        });
        let updatedField = { Name: newFieldValue.Name, Value: newValue, ControlType: newFieldValue.ControlType };
        //console.log(field)
        const index = fieldData.indexOf(newFieldValue)
        const newData = [...fieldData]
        newData[index] = updatedField
        setFieldData(newData)     
    }

    const getOptionsForSelect = function(options){
        let defaultOption = (<option>-</option>)
        return (defaultOption,[...options.map(value =>{
            return <option>{value.Name}</option>
        })])
    }

    const submitData = async function (event) {
        event.preventDefault();
        console.log(fieldData)
        setIsSubmiting(true);
        let data = fieldData.reduce(
            (obj, item) => Object.assign(obj, { [item.Name]: item.Value }), {})
        console.log(data)
        isInEdit ? await apiService.update({...data, parentId}) : await apiService.create(data)
        setIsSubmiting(false);
    };

    const findProp = function(propName){
        
        const newFieldValue = fieldProp.find((field, i) => {
            if (field.Name === propName) {               
                return true; // stop searching
            }
        });
       // console.log(newFieldValue,propName)
        return newFieldValue
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isInEdit ? `Edit ${title}` : `New ${title}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="group-form" onSubmit={submitData}>
                        {fieldData && fieldData.map((field)=>{
                            return (
                                <Form.Group className="mb-3" controlId="itemGroupName">
                                    <Form.Label>{field.Name}</Form.Label>
                                    {field.ControlType == 'Text' && (<Form.Control
                                        name={field.Name}
                                        type={field.ControlType}
                                        value={field.Value}
                                        placeholder={"Enter " + field.Name}
                                        onChange={(e) => updateFieldOnChange(e.target.value, field.Name)}
                                    />)}
                                    {field.ControlType == 'Select' &&
                                    (<Form.Select  onChange={(e) => updateFieldOnChange(e.target.value, field.Name)}>
                                        {getOptionsForSelect(findProp(field.Name).Value)}
                                    </Form.Select>)}
                                </Form.Group>
                            )
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        form="group-form"
                        type="submit"
                        variant="primary"
                        disabled={isSubmiting}
                    >
                        {isInEdit ? 'Update' : 'Create'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ItemModal;
