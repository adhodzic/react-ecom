import CartList from './CartList'
import CartActionBar from './CartActionBar';
function Cart() {
    return (
        <div className="Cart">
            <CartList></CartList>
            <CartActionBar></CartActionBar>
        </div>
    );
}

export default Cart;
