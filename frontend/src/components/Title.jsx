import React from 'react'

const Title = ({t1,t2})=> {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
      <p className='text-gray-700'>{t1} <span className='text-gray-700 font-medium'>{t2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title
