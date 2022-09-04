import ItemList from "../Item/ItemList"
import './Home.css'
function Home({cartItems, setCartItems}){
    return(
        <div className="Home">
            <ItemList setCartItems={setCartItems}></ItemList>
        </div>
    )
}

export default Home