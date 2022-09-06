import React,{useContext, useState} from "react"
import {Context} from "../Context"

function Image({className, img}) {
    const [hovered, setHovered] = useState(false)
    const {toggleFavorite, addItemsToCart, cartItems, removeItemsFromCart} = useContext(Context)

    function heartIcon () {
        if (img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if (hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    } 

    function cartIcon () {
        const addedToCartItems = cartItems.some(item => item.id === img.id)
        if (addedToCartItems) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeItemsFromCart(img)}></i>
        } else if (hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addItemsToCart(img)}></i>
        }
    }
    
    return (
        <div 
            className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={img.url} className="image-grid" alt="notloading"/>
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

export default Image