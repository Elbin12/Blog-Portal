import React, { useRef, useState } from 'react'
import {useDispatch} from 'react-redux'
import { MdEdit } from 'react-icons/md';
import { createBlog } from '../../../Features/User/UserActions';

function CreateBlog() {

  const [pic, setPic] = useState();
  const [img, setImg] = useState();
  const [heading, setHeading] = useState();
  const [subHeading, setSubHeading] = useState();
  const [textBody, settextBody] = useState();

  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleImg = (e)=> {
    const file = e.target.files[0]
    if(file){
      const cachedURL = URL.createObjectURL(file);
      setImg(cachedURL);
      console.log(img, 'image')
      setPic(file);
    }
  }

  const handleSubmit = ()=> {
    const data = {
      image : pic,
      heading: heading,
      sub_heading: subHeading,
      body: textBody
    }
    console.log('lk', data);
    
    dispatch(createBlog(data));
  }

  return (
    <div className='bg-gray-200 pb-11'>
      <div className='flex flex-col items-center gap-6 pt-3 px-32'>
        {/* <input type="text" className='text-7xl font-thin bg-transparent text-center outline-none border-b py-3 border-stone-400' defaultValue={'Add Title'}/>
        <div className='w-full'>
            <input type="text" className=' text-5xl font-thin bg-transparent outline-none border-b py-3 border-stone-400' defaultValue={'Add Sub Heading'}/>
        </div> */}
        {!img &&
          <div className='w-full text-end'>
            <button className='bg-lime-700 text-white py-2 px-4 rounded shadow-lg' onClick={()=>inputRef.current.click()}>Add an Image</button>
          </div>
        }
        <input type="file" className='hidden' ref={inputRef} onChange={handleImg}/>
        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="flex-grow w-full">
            <input
              type="text"
              className="text-5xl font-bold bg-transparent w-full outline-none border-b py-3 border-gray-300 mb-4"
              placeholder="Add Title"
              onChange={(e)=>setHeading(e.target.value)}
            />
            {img &&
              <div className='relative w-full h-30rem]'>
                <div className='absolute w-full flex justify-end p-4 cursor-pointer' onClick={()=>inputRef.current.click()}>
                  <MdEdit className='text-white text-2xl'/>
                </div>
                <img src={img} alt="" className='w-full h-full object-cover'/>
              </div>
            }
            <input
              type="text"
              className="text-2xl font-normal bg-transparent w-full outline-none border-b py-3 border-gray-300 mb-8"
              placeholder="Add Subheading"
              onChange={(e)=>setSubHeading(e.target.value)}
            />
            <textarea
              className="w-full h-64 p-4 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-transparent"
              placeholder="Write your blog post here..."
              onChange={(e)=>settextBody(e.target.value)}
            />
          </div>
        </div>
        <div className='text-end w-full'>
          <button className='bg-lime-700 text-white px-9 py-2 rounded shadow-lg hover:bg-lime-800' onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
