import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

function Cart() {
  const { products, money, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const i in cartItems) {
        for (const j in cartItems[i]) {
          if (cartItems[i][j] > 0) {
            tempData.push({
              _id: i,
              size: j,
              quantity: cartItems[i][j]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title t1={'Your'} t2={'Cart'} />
      </div>
      <div>
        {
          cartData.map((i, index) => {
            const productsData = products.find((product) => product._id === i._id)
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productsData.image[0]} className='w-16 sm:w-20' alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productsData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p><del className='mx-3'>{money}{productsData.price + 150}</del>{money}{productsData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-100'>{i.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => { e.target.value === '' || e.target.value === '0' ? null : updateQuantity(i._id, i.size, Number(e.target.value)) }} type="number" min={1} defaultValue={i.quantity} name="" id="" className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                <img onClick={() => updateQuantity(i._id, i.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3 '>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
