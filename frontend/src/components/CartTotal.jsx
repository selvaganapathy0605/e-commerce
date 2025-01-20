import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {money,getCartAmount,delivery_fee} = useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title t1={'Cart'} t2={'Total'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{money}{}{getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{money}{delivery_fee}.00</p>
        </div>
        <div className="flex justify-between">
            <b>Total</b>
            <b>{money}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
