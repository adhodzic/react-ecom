import {Card, Button} from 'react-bootstrap'

import './ItemCard.css'
import useCoreCard from './coreCardHook';

function CoreCard({ itemData, isCartItem = false }) {
    const {
        toDetails,
        addToCart,
        removeFromCart,
        data
    } = useCoreCard(itemData)
    return (
        <div className="CoreCard">
            <Card className={isCartItem?'horizontal':'ver'}>
                {!isCartItem && (<Card.Img width="200" height="200" data-src="holder.js/200x200"/>)}
                {isCartItem && (<Card.Img width="200" height="200" data-src="holder.js/200x200"/>)}
                <Card.Body>
                    <Card.Title>
                    <div className='title-flex'>
                        <p>{data.Name}</p> 
                        {!isCartItem && (
                        <i className="fa-solid fa-pen-to-square button" onClick={()=>toDetails()}></i>
                        )}
                    </div>
                    
                    </Card.Title>
                    
                    <Card.Text>
                        Group: {data.ItemGroup?.Name}
                    </Card.Text>
                    <Card.Text>
                        Status: {data.Status}
                    </Card.Text>
                    
                    {!isCartItem && (
                        <i className="fa-solid fa-cart-plus button" onClick={()=>addToCart()}></i>
                    )}
                    {isCartItem && (
                        <Button variant="danger" onClick={()=>removeFromCart(data._id)}>Remove</Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CoreCard;
