
import { useState, useEffect } from 'react';
import './App.css';
import Semester from './components/Semester/Semester.js';
import SemesterButton from './components/SemesterButton';
import { CourseObject } from './utils';





function App() {

  const [semesters, setSemesters] = useState([])
  const [activeSemesterID, setActiveSemester] = useState(0);

  const localStorageKey = 'results';


  useEffect(() => {
    let results = localStorage.getItem(localStorageKey)
    if (results !== null) { 
      results = JSON.parse(results)

    }
    else if (results === null || results.length < 0) {
      results = [{ courses: [new CourseObject("", 0, 5)], }]
    } 
      
    setSemesters(results)
    
  }, [])


  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(semesters));
  }, [semesters]);


  



  const addCourse = (semesterIndex, course) => {
    const newSemesters = [...semesters];
    newSemesters[semesterIndex].courses.push(course);

    setSemesters(newSemesters);

    return newSemesters;
  };


  const addSemester = () => {
    const newSemesters = [...semesters]
    newSemesters.push({ courses: [ new CourseObject("", 0, 5)] });
    setSemesters(newSemesters);

    setActiveSemester(newSemesters.length - 1)
  }


  const checkIfSemesterActive = (semesterIndex) => {
    return (semesterIndex === activeSemesterID)
  }



  // const updateCourse = (semesterIndex, courseIndex) => {
  //   const newSemesters = [...semesters];
  //   let semester = newSemesters[semesterIndex];

  //   semester.courses[courseIndex].unit 
  // }


  const handleUnitChange = (semesterIndex, courseIndex, unit) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].unit = parseInt(unit);

    setSemesters(newSemesters)
  }

  const handleGradeChange = (semesterIndex, courseIndex, grade) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].grade = grade;

    setSemesters(newSemesters)
  }

  const handleClearCourses = (semesterIndex) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex]

    semester.courses = [];

    setSemesters(newSemesters)
  }



  const handleDeleteCourse = (semesterIndex, courseIndex) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses.splice(courseIndex, 1);

    setSemesters(newSemesters);
  }



  const handleDeleteSemester = (semesterIndex) => {
    if (semesters.length === 1){
      handleClearCourses(semesterIndex);
      return
    }
    const newSemesters = [...semesters];
    newSemesters.splice(semesterIndex, 1)

    if (semesterIndex === activeSemesterID) {
      setActiveSemester(Math.max(activeSemesterID - 1, 0))
    }
    setSemesters(newSemesters);


  }


  const calculateGPA = (semesters) => {
    let totalUnits = 0;
    let totalGrades = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        const unit = parseInt(course.unit);
        const grade = parseInt(course.grade);

        totalUnits += unit;
        totalGrades += (unit * grade);
      });
    });


    let CGPA = (totalGrades / totalUnits).toFixed(2)
    return {
      CGPA: isNaN(CGPA) ? 0 : CGPA,
      totalUnits: totalUnits
    };
  };



  const results = calculateGPA(semesters);

  return (
    <div className='content flex flex-col grow p-3 px-7 gap-1'>
      {/* Header */}
      <span className='content__header mb-2 border-b-4 border-indigo-500 self-start pb-3'>GPA CALCULATOR</span>

      {/* Dialup section */}
      <div className='flex border-b-2  pb-3'>
        <div className='mr-auto'>
          {results.CGPA || "0"} / 5
        </div>
        <div className='self-end flex flex-col'>
          <span className='mb-4'> <span>Units Total: {results.totalUnits}</span> </span>

          <button className='bg-slate-800 p-3 rounded text-white'>View Analysis</button>
        </div>
      </div>

      {/* Semesters picker */}
      <div className=''>
        <div className='flex'>
          {semesters.map((semester, index) => {
            return <SemesterButton key={index} id={index} active={checkIfSemesterActive(index)} onClick={() => setActiveSemester(index)} handleDeleteSemester={() => handleDeleteSemester(index)} />
          })}

          <button className='ml-auto rounded border p-2 bg-black text-white' onClick={addSemester}>Add Semester + </button>
        </div>
      </div>
      {/* Calculator */}
      <div className="flex flex-col bg-white grow p-3">
        {semesters.length > 0 &&
          <Semester
            courses={semesters[activeSemesterID].courses}
            id={activeSemesterID} addCourse={addCourse}
            handleGradeChange={handleGradeChange}
            handleUnitChange={handleUnitChange}
            handleClearCourses={() => handleClearCourses(activeSemesterID)}
            handleDeleteCourse={handleDeleteCourse} />
        }
        {/* Semester data */}

      </div>
    </div>


  );
}

export default App;
