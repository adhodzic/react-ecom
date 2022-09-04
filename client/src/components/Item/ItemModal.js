import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
function ItemModal({handleClose, show, isInEdit, modalProp, apiService, rowData, parentId, title}) {
    //props needed for modal are:
    //  isInEdit(true/false)
    //  fieldProp(Array of Objects containing Field name, ControlType and Data if exits)
    const [fieldData, setFieldData] = useState()
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    async function getOptionsFromDataSource(dataSource){
        let options = await dataSource.get();
        if(options.length <= 0) return []
        return options.map((option)=>{
            return option.Name
        })
    }

    async function tranformData(data){
        if(modalProp){
            return await Promise.all(Object.entries(modalProp).map(async (e) => {
                let options = e[1].DataSource && await getOptionsFromDataSource(e[1].DataSource)
                return {
                    Name: e[0],
                    Value: isInEdit?data[e[0]]:'',
                    ControlType: e[1].ControlType,
                    Options: e[1].Options ? e[1].Options : options
                }
            }));
        }
        return []
    }

    useEffect(()=>{
        async function getFields(){
            setIsLoading(true)
            let tranformedData = await tranformData(rowData);
            setFieldData([...tranformedData])
            setIsLoading(false)
        }
        getFields();
        
        
    },[modalProp,show])

    const updateFieldOnChange = function(newValue, field){
        const index = fieldData.indexOf(field)
        const newData = [...fieldData]
        field.Value = newValue
        newData[index] = field
        setFieldData(newData)     
    }

    const getOptionsForSelect =  function(prop){
        if(!prop) return
        let defaultOption = (<option>-</option>)
        return ([defaultOption,[...prop.map(value =>{
            return (<option key={value}>{value}</option>)
        })]])
    }

    const submitData = async function (event) {
        event.preventDefault();
        setIsSubmiting(true);
        let data = fieldData.reduce(
            (obj, item) => Object.assign(obj, { [item.Name]: item.Value }), {})
        isInEdit ? await apiService.update(data, rowData._id) : await apiService.create(data, parentId)
        setIsSubmiting(false);
        handleClose();
    };

    const findProp = function(propName){
        const fieldProp = Object.entries(modalProp).find((field, i) => {
            if (field[0] === propName) {               
                return true; // stop searching
            }
        });
        return fieldProp
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isInEdit ? `Edit ${title}` : `New ${title}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="group-form" onSubmit={submitData}>
                        {(fieldData && !isLoading) && fieldData.map((field)=>{
                            return (
                                <Form.Group key={field._id} className="mb-3" controlId="itemGroupName">
                                    <Form.Label style={{color: '#333'}}><b>{field.Name}</b></Form.Label>
                                    {field.ControlType == 'Text' && (<Form.Control
                                        key={field?._id}
                                        name={field.Name}
                                        type={field.ControlType}
                                        value={field?.Value}
                                        placeholder={"Enter " + field.Name}
                                        onChange={(e) => updateFieldOnChange(e.target.value, field)}
                                    />)}
                                    {field.ControlType == 'Select' &&
                                    (<Form.Select value={field?.Value} key={field._id} onChange={(e) => updateFieldOnChange(e.target.value, field)}>
                                        {getOptionsForSelect(field.Options)}
                                    </Form.Select>)}
                                </Form.Group>
                            )
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={isSubmiting} variant="secondary" onClick={handleClose}>
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
