import { Button } from "react-bootstrap";
import orderApiService from "../../services/orderApi"
import { cartContext } from "../../App";
import { useContext } from "react";
import './Cart.css'
function CartActionBar() {
    const cart = useContext(cartContext)
    const {cartItems} = cart
    function placeOrder(){
        orderApiService.create(cartItems)
    }
    return (
        <div className="CartActionBar">
            <Button disabled={cartItems?.length <= 0} onClick={()=>placeOrder()}>Place and order</Button>
        </div>
    );
}

export default CartActionBar;
