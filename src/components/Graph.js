import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2";
import { calculateCGPA } from '../utils';



function Graph({ semesters }) {
    // 1. Get the labels
    // Takes in the current semester state, and does the rest from there

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const gpa_per_semester = semesters.map((semester) => calculateCGPA([semester]).CGPA);

    let cgpa_at_semester = [];
    
    for(let i=0; i < semesters.length; i++) {
        let cgpa = calculateCGPA(semesters.slice(0, i+1)).CGPA;
        cgpa_at_semester.push(cgpa)
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'CGPA and GPA at each semester chart',
          },
        },
        scales: {
            y: {
                max: 5,
                min: 0,
                ticks: {
                    stepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 5,

                },
                
            },
            
        },
        
        
      };
    // For cgpa per semester, start from first semester, caluclate cgpa, then include the second semester in the data
    const data = {
        labels: semesters.map((semester, index) => `Semester ${index+1}`),
        datasets: [
            {
                label: 'GPA per semester',
                data: gpa_per_semester,
                borderColor: 'rgb(255, 99, 132)',
                
            },
            {
                label: 'CGPA at every semester',
                data: cgpa_at_semester,
                borderColor: 'rgb(53, 162, 235)',
            }
        ]
    }
    return (
        <div className=''>
            <Line data={data} options={options}/>
        </div>
    )
}

export default Graph