import { useEffect, useState } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
import ItemGroup from "./ItemGroup";
import ItemField from "./ItemField";
import './ItemLayout.css'
function ItemLayout() {
    const [itemGroupRow, setItemGroupRow] = useState([]);
    const [itemFieldRow, setItemFieldRow] = useState([]);
    useEffect(() => {
        
    }, [itemGroupRow]);
    useEffect(() => {
       
    }, [itemFieldRow]);

    return (
        <div className="ItemLayout">
                <div className="div1">
                    <ItemGroup ind={itemGroupRow.index} row={itemGroupRow} setRow={setItemGroupRow}/>
                </div>
                <div className="div2">
                    <ItemField key={itemGroupRow.index} row={itemGroupRow} setRow={setItemFieldRow}/>
                </div>
                <div className="div3">
                
                </div>
        </div>
    );
}

export default ItemLayout;
