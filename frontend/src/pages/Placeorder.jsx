import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Placeorder() {
  const [method, setMethod] = useState('cod');
  const { navigate,backendURL,token,cartItems,setCartItems,getCartAmount,delivery_fee,products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSumbitHandler = async(e)=>{
    e.preventDefault()
    try {
      let orderItems = []
      for (const i in cartItems){
        for(const j in cartItems[i]){
          if (cartItems[i][j] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === i))
            if (itemInfo) {
              itemInfo.size = j
              itemInfo.quantity = cartItems[i][j]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }

      switch(method){
        case "cod":
          const response = await axios.post(backendURL + '/api/order/place',orderData,{headers:{token}})
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
        break;

        case 'stripe':
          const responseStripe = await axios.post(backendURL + '/api/order/stripe',orderData,{headers:{token}})
          console.log(responseStripe)
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSumbitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className='text-xl sm:text-2xl my-3'>
          <Title t1={'DELIVERY'} t2={'IN FORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email ID' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street Name' />
        <div className="flex gap-3">
          <input required  onChange={onChangeHandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required  onChange={onChangeHandler} name='state' value={formData.state}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <input required  onChange={onChangeHandler} name='pincode' value={formData.pincode}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='PinCode' />
        <input required  onChange={onChangeHandler} name='country' value={formData.country}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country ' />
        <input required  onChange={onChangeHandler} name='phone' value={formData.phone}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" placeholder='Phone Number' />
      </div>
      <div className='mt-8'>
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title t1={'PAYMENT'} t2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 curs'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 curs'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 tex-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 texxt-sm'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
