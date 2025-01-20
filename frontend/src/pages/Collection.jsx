import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import SearchBar from '../components/SearchBar'

function Collection() {
  const {products,search,showSearch} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(false)
  const [filterProducts,setProductFilter] = useState([])
  const [cateGory,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory =(e)=>{
    if(cateGory.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(i=>i.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (cateGory.length > 0){
      productsCopy = productsCopy.filter(item => cateGory.includes(item.category))
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setProductFilter(productsCopy)
  }

  const sortProduct = ()=>{
    let filterProductCopy = filterProducts.slice()
    switch(sortType){
      case 'low-high':
        setProductFilter(filterProductCopy.sort((a,b)=>(a.price - b.price)))
        break
      case 'high-low':
        setProductFilter(filterProductCopy.sort((a,b)=>(b.price - a.price)))
        break

      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[cateGory,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-3 pt-10 border-t'>
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-3">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={'Men'} className='w-3' onClick={toggleCategory}/>Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Women'} className='w-3' onClick={toggleCategory}/>Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Kids'} className='w-3' onClick={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={'Topwear'} className='w-3' onClick={toggleSubCategory}/>Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Bottomwear'} className='w-3' onClick={toggleSubCategory}/>Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={'Winterwear'} className='w-3' onClick={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title t1={'New'} t2={'Collection'}/>
          <select onClick={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm p-2'>
            <option value="relavent">Sort by Relavent</option>
            <option value="low-high">Sort by Low-High</option>
            <option value="high-low">Sort by High-Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    filterProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
      </div>
    </div>
  )
}

export default Collection
