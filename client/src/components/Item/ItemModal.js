import { useEffect, useState } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
function ItemModal({handleClose,show, isInEdit, fieldProp, apiService, id}) {
    //props needed for modal are:
    //  isInEdit(true/false)
    //  fieldProp(Array of Objects containing Field name, ControlType and Data if exits)
    const [fieldData, setFieldData] = useState([])
    const [isSubmiting, setIsSubmiting] = useState(false);
    useEffect(()=>{
        setFieldData(fieldProp)
    },[fieldProp,show])

    const setField = function(newValue, Name){
        const field = fieldData.find((o, i) => {
            if (o.Name === Name) {
                console.log(o, o.Name)
                fieldData[i] = { Name: o.Name, Value: newValue, ControlType: o.ControlType };
                return true; // stop searching
            }
        });
        //console.log(field)
        const index = fieldData.indexOf(field)
        const newData = [...fieldData]
        newData[index] = field
        setFieldData(newData)     
    }

    const submitData = async function () {
        setIsSubmiting(true);
        var data = fieldData.reduce(
            (obj, item) => Object.assign(obj, { [item.Name]: item.Value }), {});
        console.log(data)
        isInEdit ? await apiService.update({...data, id}) : await apiService.create(data)
        setIsSubmiting(false);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isInEdit ? 'Edit Group Item' : 'New Group Item'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="group-form" onSubmit={submitData}>
                        {fieldData && fieldData.map((field)=>{
                            return (
                                <Form.Group key={field.Name} className="mb-3" controlId="itemGroupName">
                                    <Form.Label>{field.Name}</Form.Label>
                                    <Form.Control
                                        type={field.ControlType}
                                        value={field.Value}
                                        placeholder={"Enter Group " + field.Name}
                                        onChange={(e) => setField(e.target.value, field.Name)}
                                    />
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
