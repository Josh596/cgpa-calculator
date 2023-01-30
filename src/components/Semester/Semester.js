import React from 'react'
import Course from '../Course/Course'
import './Semester.css'

function Semester({ title }) {
    return (
        <div className='flex flex-col'>
            {/* Title */}
            <span className='font-bold pb-4' style={{color: 'rgb(3,4,94)'}}>{title}</span>
            {/* Courses table */}
            <table className='table-auto mx-3'>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Grade</th>
                        <th>Credits/Units</th>
                    </tr>
                </thead>
                <tbody>
                    <Course />
                </tbody>
            </table>

            {/* Add Course and Reset all */}
            <div className="flex justify-center gap-4 pt-3">
                <button className='add-course text-white p-2 rounded font-bold'>Add Course</button>
                <button className='clear-all text-white p-2 rounded font-bold'>Clear All</button>
            </div>
        </div>
    )
}

export default Semester