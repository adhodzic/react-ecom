import {Form} from 'react-bootstrap'

function TableGrid({...props}) {
    const {getTableHeaders, selectedRow, setSelectedRow, handleShow, checkedRows, addToCheckedList, checkAll, data} = props

    const renderTableRows = (data) =>{
        const headers = getTableHeaders()
        return data.map((row) => {
         return(
             <tr key={row._id} className={selectedRow && selectedRow._id == row._id ? 'selected': ''} onClick={ (e)=> setSelectedRow(row)}>
                <td>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>handleShow(true, row)}></i>
                </td>
                <td>
                    <Form.Check
                        inline
                        name="row"
                        checked={checkedRows.some((item) => item?._id === row._id)} 
                        onChange={e =>addToCheckedList(e, row)}
                        onClick={(e) => e.stopPropagation()}
                    />        
                </td>
                 {headers.map((header) => {
                     return(
                         <td key={header}>{row[header]}</td>
                     )
                 })}
             </tr>
         )
        })
     }
    
    const renderTableHeaders = (data) =>{
        const headerArray = getTableHeaders()
        return  headerArray.map((header)=>{
            return (<th key={header}>{header}</th>)
        })     
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>
                        <Form.Check
                            inline
                            onChange={e => checkAll(e)}
                        />      
                    </th>
                    {renderTableHeaders(data)}
                </tr>
            </thead>
            <tbody>
                {renderTableRows(data)}
            </tbody>
        </table>
    );
}

export default TableGrid;