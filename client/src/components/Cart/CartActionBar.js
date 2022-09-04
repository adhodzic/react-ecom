import { Button } from "react-bootstrap";
import orderApiService from "../../services/orderApi"
import { cartContext } from "../../App";
import { useContext } from "react";
function CartActionBar() {
    const cart = useContext(cartContext)
    function placeOrder(){
        const {cartItems} = cart
        orderApiService.create(cartItems)
    }
    return (
        <div className="CartActionBar">
            <Button onClick={()=>placeOrder()}>Place and order</Button>
        </div>
    );
}

export default CartActionBar;
