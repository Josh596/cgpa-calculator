import React from 'react'
import Course from '../Course/Course'
import { CourseObject } from '../../utils'
import './Semester.css'

function Semester(props) {

    const calculateGPA = (courses) => {
        let totalUnits = 0;
        let totalGradePoints = 0;

        courses.forEach((course) => {
            totalUnits += parseInt(course.unit);
            totalGradePoints += parseInt(course.unit) * parseInt(course.grade);
        });

        let gpa = (totalGradePoints / totalUnits).toFixed(2)
        
        return isNaN(gpa) ? 0 : gpa;
    };


    const handleAddCourse = () => {
        const course = new CourseObject("", 0, 5);
        props.addCourse(props.id, course);
    }


    return (
        <div className='flex flex-col'>
            {/* Title */}
            <div className='flex pb-4'>
                <span className='font-bold mr-auto' style={{ color: 'rgb(3,4,94)' }}>Semester {props.id + 1}</span>
                <span className='font-bold'>Semester GPA: {calculateGPA(props.courses)}</span>
            </div>
            {/* Courses table */}
            <table className='table-auto mx-3'>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Grade</th>
                        <th>Credits</th>
                    </tr>
                </thead>
                <tbody>
                    {props.courses.map((course, index) => {
                        return <Course
                            key={index} id={index}
                            course={course}
                            handleCourseTitleChange={(title) => props.handleCourseTitleChange(props.id, index, title)}
                            handleUnitChange={(unit) => props.handleUnitChange(props.id, index, unit)}
                            handleGradeChange={(grade) => props.handleGradeChange(props.id, index, grade)}
                            handleDeleteCourse={() => props.handleDeleteCourse(props.id, index)} />
                    })}

                </tbody>
            </table>

            {/* Add Course and Reset all */}
            <div className="flex justify-center gap-4 pt-3">
                <button className='add-course text-white p-2 rounded font-bold' onClick={handleAddCourse}>Add Course</button>
                <button className='clear-all text-white p-2 rounded font-bold' onClick={props.handleClearCourses}>Clear All</button>
            </div>
        </div>
    )
}

export default Semester