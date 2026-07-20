import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

function CoursesPage() {

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchCourses() {

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const data = await response.json();

      const mappedCourses = data.slice(0, 5).map((post, index) => ({
        id: post.id,
        name: post.title,
        code: `CS20${index + 1}`,
        credits: 3 + (index % 2),
        grade: "A"
      }));

      setCourses(mappedCourses);

      setLoading(false);

    }

    fetchCourses();

  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (

    <>

      <h2>Courses</h2>

      <div className="course-grid">

        {courses.map(course => (

          <CourseCard
            key={course.id}
            {...course}
          />

        ))}

      </div>

    </>

  );

}

export default CoursesPage;