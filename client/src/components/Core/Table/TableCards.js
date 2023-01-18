import {Form} from 'react-bootstrap'
import CoreCard from '../Card/CoreCard';
import { Col, Row } from "react-bootstrap";
function TableGrid({...props}) {
    const {getTableHeaders, selectedRow, setSelectedRow, handleShow, checkedRows, addToCheckedList, checkAll, data} = props

    return (
        <Row className="g-5">             
                {data && (data.map((item)=>{
                    return (
                        <Col key={item._id} xs={8} sm={7} md={6} lg={4} xl={4} xxl={3}>
                            <CoreCard itemData={item}></CoreCard>
                        </Col>
                        )
                }))}
        </Row>
    );
}

export default TableGrid;