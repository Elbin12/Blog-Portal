import React from 'react'

function InputBox({Name, handler, curr}) {
    console.log(curr, 'ld')
  return (
    <div className='flex gap-6'>
        <label className='text-white font-thin'>{Name} :</label>
        <input type="text" className='bg-transparent border-b text-white focus:border-lime-400 outline-none px-3' value={curr} onChange={(e)=>{handler(e.target.value)}}/>
    </div>
  )
}

export default InputBox
