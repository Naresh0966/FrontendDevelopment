import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll } from "../redux/enrollmentSlice";

function CourseCard({ id, name, code, credits, grade }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEnroll() {
    dispatch(
      enroll({
        id,
        name,
        code,
        credits,
        grade,
      })
    );

    navigate("/profile");
  }

  return (
    <div className="course-card">
      <Link to={`/courses/${id}`}>
        <h3>{name}</h3>
      </Link>

      <p>Code: {code}</p>
      <p>Credits: {credits}</p>
      <p>Grade: {grade}</p>

      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
}

export default CourseCard;