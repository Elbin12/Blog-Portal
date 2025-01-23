import React from 'react'

function PopupElement({title, icon:Icon, handlerFunction}) {
  return (
    <div className="flex items-center px-4 py-3 hover:underline cursor-pointer transition-colors duration-200" onClick={handlerFunction}>
        <Icon className="text-xl text-gray-600 mr-3"/>
        <span className="text-sm text-gray-700">{title}</span>
    </div>
  )
}

export default PopupElement
