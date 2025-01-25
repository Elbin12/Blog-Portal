import React from 'react'

function CreateBlog() {
  return (
    <div className='bg-gray-200 h-screen'>
      <div className='flex flex-col items-center gap-6 pt-3 px-32'>
        <input type="text" className='text-7xl font-thin bg-transparent text-center outline-none border-b py-3 border-stone-400' defaultValue={'Add Title'}/>
        <div className='w-full'>
            <input type="text" className=' text-5xl font-thin bg-transparent outline-none border-b py-3 border-stone-400' defaultValue={'Add Sub Heading'}/>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
