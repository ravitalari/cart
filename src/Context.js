import React,{useEffect, useState} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] =  useState([])
    const [cartItems, setCartItems] = useState([])
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    useEffect(() =>{
        fetch(url)
        .then(res => res.json())
        .then(data=> setAllPhotos(data))
    }, [])

    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if (photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }

            return photo
        })

        setAllPhotos(updatedArr)
    }

    function addItemsToCart(item) {
        setCartItems(prevItems => [...prevItems, item] )
    }

    function removeItemsFromCart(item) {
        setCartItems(prevItems => prevItems.filter(items => items.id !== item.id))
    }

    function emptyCart() {
        setCartItems([])
    }

    return (
        <Context.Provider value={{allPhotos, toggleFavorite, addItemsToCart, cartItems, removeItemsFromCart, emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}