const createCourse = (title, unit, grade) => ({ title, unit, grade });

function CourseObject(title, unit, grade) {
  this.title = title;
  this.unit = unit;
  this.grade = grade;
}


const calculateCGPA = (semesters) => {
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

export {createCourse, CourseObject, calculateCGPA};