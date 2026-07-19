function CourseCard({ id, name, code, credits, grade, onEnroll }) {
  return (
    <div className="course-card">
      <h3>{name}</h3>

      <p><strong>Course Code:</strong> {code}</p>

      <p><strong>Credits:</strong> {credits}</p>

      <p><strong>Grade:</strong> {grade}</p>

      <button onClick={() => onEnroll(id)}>
        Enroll
      </button>
    </div>
  );
}

export default CourseCard;