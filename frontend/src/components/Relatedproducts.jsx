import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Relatedproducts = ({category,subCategoory}) => {
    const { products } = useContext(ShopContext)
    const [related,setRelated] = useState([])
    useEffect(()=>{
        if(products.length > 0){
            let productsDataCopy = products.slice();
            productsDataCopy = productsDataCopy.filter((i)=>category === i.category)
            productsDataCopy = productsDataCopy.filter((i)=>subCategoory === i.subCategoory)
            setRelated(productsDataCopy.slice(0,5))
        }
    },[products])
  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title t1={'Related'} t2={'Products'}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>
    </div>
  )
}

export default Relatedproducts
