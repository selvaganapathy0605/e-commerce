import React, { useContext, useState } from 'react'
import brandlogo from '../assets/admin_assets/brandlogo.png'
import {Link, NavLink} from 'react-router-dom'
import profile_icon from '../assets/frontend_assets/profile_icon.png'
import search_icon from '../assets/frontend_assets/search_icon.png'
import cart_icon from '../assets/frontend_assets/cart_icon.png'
import menu_icon from '../assets/frontend_assets/menu_icon.png'
import cross_icon from '../assets/frontend_assets/cross_icon.png'
import { ShopContext } from '../context/ShopContext'

function Navbar() {
  const [visible,setVisible] = useState(false)
  const {showSearch,setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)

  const logout = ()=>{
    navigate('/login')
    setCartItems({})
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}>
      <img src={brandlogo} className='w-36' alt="" />
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1' >
          <p>HOME</p>
          <hr className='w-4/5 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1' >
          <p>COLLECTION</p>
          <hr className='w-4/5 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1' >
          <p>ABOUT</p>
          <hr className='w-4/5 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1' >
          <p>CONTACT</p>
          <hr className='w-4/5 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={()=>{setShowSearch(!showSearch)}} src={search_icon} alt="" className='w-5 cursor-pointer' />
        <div className="group relative">
          <img onClick={()=> token ? null : navigate('/login')} src={profile_icon} alt="" className="w-5 cursor-pointer"/>

            {
              token && 
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Log out</p>
              </div>
            </div>
            }

        </div>
        <Link to='/cart' className='relative'>
          <img src={cart_icon} alt="" className='w-5 min-w-5:' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>{setVisible(true)}} src={menu_icon} alt=""  className='w-5 cursor-pointer sm:hidden'/>
      </div>
      <div className={`absolute h-fit  top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={()=>{setVisible(false)}} className="flex items-center flex-row-reverse gap-4 p-3 mr-5 cursor-pointer ">
            <img className='h-6 w-6 rotate-180' src={cross_icon} alt="" />
          </div>
          <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 text-center border text-2xl' to='/'>Home</NavLink>
          <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 text-center border text-2xl' to='/collection'>Collection</NavLink>
          <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 text-center border text-2xl' to='/about'>About</NavLink>
          <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 text-center border text-2xl' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
