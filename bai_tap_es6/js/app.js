
// DỮ LIỆU COURSES
let courses = [
  {
    id: 1,
    title: "ReactJS Tutorial",
    rating: 4.2
  },
  {
    id: 2,
    title: "Angular Tutorial",
    rating: 2.5
  },
  {
    id: 3,
    title: "VueJS Tutorial",
    rating: 3.8
  },
  {
    id: 4,
    title: "Java Tutorial",
    rating: 4
  },
  {
    id: 5,
    title: "JavaScript Tutorial",
    rating: 3.5
  }
];

// DỮ LIỆU ADDED COURSES

let addedCourses = [
  {
    id: 6,
    title: "PHP Tutorial",
    rating: 3
  },
  {
    id: 7,
    title: "C# Tutorial",
    rating: 2
  },
  {
    id: 8,
    title: "Docker Tutorial",
    rating: 3.8
  }
];

// YÊU CẦU 1 (Lọc các course có rating >= 4)
let coursesRating4 = courses.filter(course => course.rating >= 4);

console.log("YÊU CẦU 1:");
console.log(coursesRating4);

// YÊU CẦU 2 (Lọc course có rating < 4 :và chuyển thành dạng: <id> - <title> - <rating>)

let coursesRatingLess4 = courses
  .filter(course => course.rating < 4)
  .map(course => `${course.id} - ${course.title} - ${course.rating}`);

console.log("YÊU CẦU 2:");
console.log(coursesRatingLess4);

// YÊU CẦU 3 (Viết hàm gộp courses và addedCourses)

const mergeCourses = (courses, addedCourses) => {
  return [...courses, ...addedCourses];
};
let allCourses = mergeCourses(courses, addedCourses);
console.log("YÊU CẦU 3:");
console.log(allCourses);
