import React from 'react'

function SemesterButton({onClick, active, title}) {
  return (
    <button className={`rounded-full border ${active ? "bg-indigo-200" : "border-black"} p-2 px-4`} onClick={onclick}>{title}</button>
  )
}

export default SemesterButton