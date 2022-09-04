import { useContext } from "react";
import ItemCard from "../Item/ItemCard";
import {cartContext} from '../../App'
function CartList(){
    const cartData = useContext(cartContext);
    function cartCount(){
        const {cartItems} = cartData
        return cartItems.length;
    }
    return(
        <div className="CartList">
            <h1>Cart Items</h1>
            <div className="cart-list">
                {cartCount() <= 0 && (<>
                    <p>Your shopping cart is empty</p>
                </>)}
                {cartData.cartItems && (cartData.cartItems.map((item)=>{
                    return (<ItemCard key={item._id} data={item} isCartItem={true}></ItemCard>)
                }))}
            </div>
        </div>
    )
}

export default CartList