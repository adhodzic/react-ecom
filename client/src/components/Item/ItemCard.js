import {Card, Button} from 'react-bootstrap'
import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {cartContext} from '../../App'
import './ItemCard.css'

function ItemCard({ data, isCartItem = false }) {
    const navigate = useNavigate();
    const cart = useContext(cartContext)
   
    function uniqueById(items) {
        const key = '_id'
        return [...new Map(items.map(item =>
            [item[key], item])).values()];
        }

    const toDetails = function(){
        navigate(`/item-details/${data._id}`)
    }
    const addToCart = function(){
        const {cartItems, setCartItems} = cart
        setCartItems(uniqueById([...cartItems, data]))
        console.log(cartItems)
    }

    const removeFromCart = function(id){
        const {cartItems, setCartItems} = cart
        const newCartItems = cartItems.filter(function(item) { return item._id != id; });
        setCartItems([...newCartItems])
    }
    return (
        <div className="ItemCard">
            <Card style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>
                    <div className='title-flex'>
                        <p>{data.Name}</p> 
                        <i class="fa-solid fa-pen-to-square button" onClick={()=>toDetails()}></i>
                    </div>
                    
                    </Card.Title>
                    
                    <Card.Text>
                        Group: {data.ItemGroup?.Name}<br/>
                        Status: {data.Status}
                    </Card.Text>
                    {!isCartItem && (<>
                        <i className="fa-solid fa-cart-plus button" onClick={()=>addToCart()}></i>
                    </>
                    )}
                    {isCartItem && (<>
                        <Button variant="danger" onClick={()=>removeFromCart(data._id)}>Remove</Button>
                    </>)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ItemCard;
