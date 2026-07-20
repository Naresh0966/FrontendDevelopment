import { useParams } from "react-router-dom";

function CourseDetailPage() {
  const { courseId } = useParams();

  return (
    <div>
      <h2>Course Details</h2>

      <p>Course ID: {courseId}</p>

      <p>This page will display the details of the selected course.</p>
    </div>
  );
}

export default CourseDetailPage;