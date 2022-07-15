
function ItemList(){
    const [show, setShow] = useState(false);
    const [itemFields, setItemFields] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [fieldId, setFieldId] = useState();
    const [fieldProp, setFieldProp] = useState();
    const [isInEdit, setIsInEdit] = useState(false);

    const fieldConf = [
        'Name.Text',
        'ItemGroup.Option'
    ]

    const handleClose = () => setShow(false);
    const handleShow = (isInEdit, row = null) => {
        setIsInEdit(isInEdit);
        const data = fieldConf.map((e)=>{
            return {
                Name: e.split('.')[0], //take string before dot
                Value: row ? row[e]: '',
                ControlType: e.split('.')[1] //take string after dot
            }
        })
        setFieldProp(data)
        setFieldId(row?._id)
        
        setShow(true);
    }

    return(
        <div className="ItemList">
            <div>
                <i className="fa-solid fa-circle-plus" onClick={()=>handleShow(false)}></i>
                <ItemModal handleClose={handleClose} isInEdit={isInEdit} show={show} fieldProp={fieldProp} apiService={apiService} id={fieldId}></ItemModal>
            </div>
            <h1>This is Item list component</h1>
        </div>
    )
}

export default ItemList