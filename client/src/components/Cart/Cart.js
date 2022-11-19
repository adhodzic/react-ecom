import CartList from './CartList'
import CartActionBar from './CartActionBar';
import './Cart.css'
function Cart() {
    return (
        <div className="Cart">
            <CartList></CartList>
            <CartActionBar></CartActionBar>
        </div>
    );
}

export default Cart;
