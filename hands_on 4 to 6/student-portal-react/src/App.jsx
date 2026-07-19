import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import StudentProfile from "./components/StudentProfile";

function App() {

  const [courses, setCourses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Runs once when the component mounts
  useEffect(() => {

    async function fetchCourses() {

      try {

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {

          throw new Error("Failed to fetch courses");

        }

        const data = await response.json();

        const mappedCourses = data.slice(0, 5).map((post, index) => ({

          id: post.id,

          name: post.title,

          code: `CS20${index + 1}`,

          credits: 3 + (index % 2),

          grade: "A"

        }));

        setCourses(mappedCourses);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }

    fetchCourses();

  }, []);

  // Runs whenever courses state changes.
  // The dependency array prevents this effect from
  // running after every render.
  useEffect(() => {

    console.log("Courses updated");

  }, [courses]);

  function handleEnroll(id) {

    if (!enrolledCourses.includes(id)) {

      setEnrolledCourses([...enrolledCourses, id]);

    }

  }

  const filteredCourses = courses.filter(course =>

    course.name.toLowerCase().includes(searchTerm.toLowerCase())

  );

  return (

    <>

      <Header

        siteName="Student Portal"

        enrolledCount={enrolledCourses.length}

      />

      <main>

        <h2>Available Courses</h2>

        <input

          type="text"

          placeholder="Search courses..."

          value={searchTerm}

          onChange={(e) => setSearchTerm(e.target.value)}

        />

        {loading && <h3>Loading...</h3>}

        {error && <h3 style={{ color: "red" }}>{error}</h3>}

        <div className="course-grid">

          {!loading &&

            filteredCourses.map(course => (

              <CourseCard

                key={course.id}

                {...course}

                onEnroll={handleEnroll}

              />

            ))}

        </div>

        <StudentProfile />

      </main>

      <Footer />

    </>

  );

}

export default App;