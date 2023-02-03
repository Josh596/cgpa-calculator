const createCourse = (title, unit, grade) => ({ title, unit, grade });

function CourseObject(title, unit, grade) {
  this.title = title;
  this.unit = unit;
  this.grade = grade;
}

export {createCourse, CourseObject};