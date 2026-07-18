import { courses } from "./data.js";

// Step 30: Destructuring
courses.forEach((course) => {
    const { name, credits } = course;
    console.log(`Course: ${name}, Credits: ${credits}`);
});

// Step 31: map()
const courseList = courses.map(
    (course) => `${course.code} - ${course.name} (${course.credits} credits)`
);

console.log("Formatted Course List:");
console.log(courseList);

// Step 32: filter()
const filteredCourses = courses.filter(
    (course) => course.credits >= 4
);

console.log("Courses with 4 or more credits:");
console.log(filteredCourses);
console.log("Count:", filteredCourses.length);

// Step 33: reduce()
const totalCredits = courses.reduce(
    (total, course) => total + course.credits,
    0
);

console.log("Total Credits:", totalCredits);

// Select Elements
const courseGrid = document.querySelector(".course-grid");
const totalCreditsElement = document.querySelector("#total-credits");
const searchInput = document.querySelector("#search-courses");
const sortButton = document.querySelector("#sort-btn");
const selectedCourse = document.querySelector("#selected-course");

// Render Function
function renderCourses(courseArray) {

    courseGrid.innerHTML = "";

    courseArray.forEach((course) => {

        const article = document.createElement("article");

        article.className = "course-card";

        // Store the course id for event delegation
        article.dataset.id = course.id;

        article.innerHTML = `
            <h3>${course.name}</h3>
            <p>Course Code: ${course.code}</p>
            <span>Credits: ${course.credits}</span>
        `;

        courseGrid.appendChild(article);

    });

}

// Initial Render
renderCourses(courses);

// Display Total Credits
totalCreditsElement.textContent = `Total Credits Enrolled: ${totalCredits}`;

// Search Courses
searchInput.addEventListener("input", (event) => {

    const searchText = event.target.value.toLowerCase();

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchText)
    );

    renderCourses(filteredCourses);

});

// Sort Courses by Credits
sortButton.addEventListener("click", () => {

    const sortedCourses = [...courses].sort(
        (a, b) => b.credits - a.credits
    );

    renderCourses(sortedCourses);

});

// Event Delegation for Course Cards
courseGrid.addEventListener("click", (event) => {

    const card = event.target.closest(".course-card");

    if (!card) return;

    const courseId = Number(card.dataset.id);

    const course = courses.find(c => c.id === courseId);

    if (!course) return;

    selectedCourse.textContent =
        `Selected Course: ${course.name} | Grade: ${course.grade}`;

});