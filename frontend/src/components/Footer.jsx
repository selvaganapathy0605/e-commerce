import React from 'react'
import logo from '../assets/admin_assets/brandlogo.png'

const Footer = () => {
    return (
        <>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className='mb-5 w-32' src={logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur tempore eos ad sit laborum odio. 
                    Aliquid illum libero nemo rerum in dicta facilis necessitatibus veritatis. Cum quod asperiores quos 
                    molestiae.
                </p>
            </div>
            <div >
                <p className="text-xl font-medium mb-5">EcomGrov</p>
                <ul className="flex flex-col  gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">Get In Touch</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+01 2345678901</li>
                    <li>ecomgrov@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />  
            <p className="py-5 text-sm text-center">Copyright 2024@ ecomgrov.com - All Right Reserved.</p>
        </div>
        </>
    )
}

export default Footer
