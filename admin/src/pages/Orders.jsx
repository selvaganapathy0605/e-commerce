import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendURL, money } from '../App'
import { toast } from 'react-toastify'
import assets from '../assets/admin_assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrder = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (e,orderId)=>{
    try {
      const response = await axios.post(backendURL +'/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if (response.data.success) {
        await fetchAllOrder()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  // fetchAllOrder()
  useEffect(() => {
    fetchAllOrder()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((i, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'  key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    i.items.map((j, index) => {
                      if (index === i.items.length - 1) {
                        return <p  className='py-0.5' key={index}>{j.name} x {j.quantity} <span>{j.size}</span></p>
                      } else {
                        return <p className='py-0.5' key={index}>{j.name} x {j.quantity} <span>{j.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-semibold'>{i.address.firstName + " " + i.address.lastName}</p>
                <div>
                  <p>{i.address.street + ", "}</p>
                  <p>{i.address.city + ", " + i.address.state + ', ' + i.address.country + ', ' + i.address.pincode}</p>
                </div>
                <p>{i.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {i.items.length}</p>
                <p className='mt-3'>Payment Method : {i.paymentMethod}</p>
                <p>Payment : {i.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(i.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{money}{i.amount}</p>
              <select onChange={(e)=> statusHandler(e,i._id)} defaultValue={i.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
