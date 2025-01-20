import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export const ShopContext = createContext();
const ShopContextProvider = (props) => {
    const money = '₹';
    const delivery_fee = 10;  
    const backendURL = "https://e-commerce-backend-dgac.onrender.com"
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    const addToCart = async (iId, size) => {
        if (!size) {
            toast.error('Select the Product Size')
            return
        }
        let cartData = structuredClone(cartItems)
        if (cartData[iId]) {
            if (cartData[iId][size]) {
                cartData[iId][size] += 1;
            }
            else {
                cartData[iId][size] = 1;
            }
        }
        else {
            cartData[iId] = {}
            cartData[iId][size] = 1;
        }
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/add', { iId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    // useEffect(()=>{
    //     setCartItems()
    // },[cartItems])

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (iId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[iId][size] = quantity
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendURL + '/api/cart/update', { iId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let amountCount = 0
        for (const i in cartItems) {
            let itemInfo = products.find((product => product._id === i))
            for (const j in cartItems[i]) {
                try {
                    if (cartItems[i][j] > 0) {
                        amountCount += itemInfo.price * cartItems[i][j]
                    }
                } catch (error) {

                }
            }
        }
        return amountCount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendURL + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }


    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(backendURL + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])
    const value = {
        products, money, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendURL, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
