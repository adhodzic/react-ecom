import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {cartContext} from '../../../App'
function useCoreCard(itemData) {
    const navigate = useNavigate();
    const cart = useContext(cartContext)
    const [data, setData] = useState(itemData)
   
    function uniqueById(items) {
        const key = '_id'
        return [...new Map(items.map(item =>
            [item[key], item])).values()];
        }

    const toDetails = function(){
        console.log(data)
        navigate(`/item-details/${data._id}`)
    }
    const addToCart = function(){
        const {cartItems, setCartItems} = cart
        console.log(data, itemData)
        setCartItems(uniqueById([...cartItems, data]))
        console.log(cartItems)
    }

    const removeFromCart = function(id){
        const {cartItems, setCartItems} = cart
        const newCartItems = cartItems.filter(function(item) { return item._id != id; });
        setCartItems([...newCartItems])
    }

    return {
        toDetails,
        addToCart,
        removeFromCart,
        data
    }

}

export default useCoreCard