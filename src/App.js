
import { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Graph from './components/Graph';
import Semester from './components/Semester/Semester.js';
import SemesterButton from './components/SemesterButton';
import SemiCircleProgressBar from './components/SemiCircleProgressBar';
import { CourseObject, calculateCGPA } from './utils';





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
    newSemesters.push({ courses: [new CourseObject("", 0, 5)] });
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


  const handleCourseTitleChange = (semesterIndex, courseIndex, title) => {
    const newSemesters = [...semesters];
    let semester = newSemesters[semesterIndex];

    semester.courses[courseIndex].title = title;

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
    if (semesters.length === 1) {
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

  const handleViewAnalysis = () => {
    const element = document.getElementById('details-section');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const results = calculateCGPA(semesters);

  return (
    <>
    {/* Ads Banner */}
    {/* <div className="w-full">
      
    </div> */}
    <div className='content flex flex-col grow p-3 px-7 gap-1'>
      {/* Header */}
      <span className='content__header mb-2 border-b-4 border-indigo-500 self-start pb-3'>GPA CALCULATOR</span>

      {/* Dialup section */}
      <div className='flex border-b-2  pb-3'>
        <div className='w-52  ml-auto mr-auto'>
          <SemiCircleProgressBar value={results.CGPA} />

        </div>
        <div className='flex flex-col'>
          <span className='mb-4'> <span>Units Total: {results.totalUnits}</span> </span>

          <button className='bg-slate-800 p-3 rounded text-white' onClick={handleViewAnalysis}>View Analysis</button>
        </div>
      </div>

      {/* Semesters picker */}
      <div className='flex whitespace-nowrap flex-wrap'>
        <div className='flex gap-2 flex-wrap'>
          {semesters.map((semester, index) => {
            return <SemesterButton key={index} id={index} active={checkIfSemesterActive(index)} onClick={() => setActiveSemester(index)} handleDeleteSemester={() => handleDeleteSemester(index)} />
          })}
        </div>
        <button className='ml-auto rounded border p-2 bg-black text-white' onClick={addSemester}>Add Semester + </button>
      </div>
      {/* Calculator */}
      <div className="flex flex-col bg-white grow p-3">
        {semesters.length > 0 &&
          <Semester
            courses={semesters[activeSemesterID].courses}
            id={activeSemesterID} addCourse={addCourse}
            handleGradeChange={handleGradeChange}
            handleUnitChange={handleUnitChange}
            handleCourseTitleChange={handleCourseTitleChange}
            handleClearCourses={() => handleClearCourses(activeSemesterID)}
            handleDeleteCourse={handleDeleteCourse} />
        }
        {/* Semester data */}
        {/* Analysis section - Graphs */}
        <div id='details-section' className=''>
          <Graph semesters={semesters} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>

      </>
  );
}

export default App;
