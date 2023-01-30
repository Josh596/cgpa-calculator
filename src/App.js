
import './App.css';
import Semester from './components/Semester/Semester.js';
import SemesterButton from './components/SemesterButton';

function App() {
  return (
    <div className='content flex flex-col grow p-3 px-7 gap-1'>
      {/* Header */}
      <span className='content__header mb-2 border-b-4 border-indigo-500 self-start pb-3'>GPA CALCULATOR</span>

      {/* Dialup section */}
      <div className='flex border-b-2  pb-3'>
        <div className='mr-auto'></div>
        <div className='self-end flex flex-col'>
          <span className='mb-4'> <span>Units Total:</span> </span>

          <button className='bg-slate-800 p-3 rounded text-white'>View Analysis</button>
        </div>
      </div>

      {/* Semesters picker */}
      <div className='flex'>
          <SemesterButton title={'Semester 1'} active={true}/>

          <button className='ml-auto rounded border p-2 bg-black text-white'>Add Semester + </button>
      </div>
      {/* Calculator */}
      <div className="flex flex-col bg-white grow p-3">
        
        {/* Semester data */}
        <Semester title={'Semester I'}/>
      </div>
    </div>

    
  );
}

export default App;
