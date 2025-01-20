import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const [currentStage, setCurrentState] = useState('Login')
  const {token,setToken,navigate,backendURL} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const onSumbitHandler = async(e)=>{
    e.preventDefault();
    try {
      if (currentStage === 'Sign Up') {
        const response = await axios.post(backendURL + '/api/user/register',{name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(backendURL +'/api/user/login',{email,password})
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)

        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSumbitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regualr text-3xl'>{currentStage}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentStage === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} required text='name' placeholder='Name' className='w-full px-3 py-2 border border-gray-800' />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} required type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget Your Password?</p>
        {
          currentStage === 'Login' ?
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p> :
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 '>
        {currentStage === 'Login' ? 'Login' : 'Create'}
      </button>
    </form>

  )
}

export default Login
