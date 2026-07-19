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
//renderCourses(courses);

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
const loadingMessage = document.querySelector("#loading-message");

const errorMessage = document.querySelector("#error-message");

const retryButton = document.querySelector("#retry-btn");

const notificationContainer =
document.querySelector("#notification-container");
// -----------------------------
// Hands-On 4 - Task 1
// -----------------------------

// Step 45 - Fetch using Promise (.then)
axios.interceptors.request.use(config => {

    console.log(`API call started: ${config.url}`);

    return config;

});
function fetchUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(user => {
            console.log("User Name (.then):", user.name);
            return user;
        });
}

// Test Step 45
fetchUser(1);

// Step 46 - Fetch using async/await
async function fetchUserAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        const user = await response.json();

        console.log("User Name (async/await):", user.name);

        return user;

    } catch (error) {

        console.error("Error fetching user:", error);

    }
}

// Test Step 46
fetchUserAsync(2);

// Step 47 - Simulate API Delay
function fetchAllCourses() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve(courses);

        }, 1000);

    });

}
// Step 48 - Loading State

async function loadCourses() {

    loadingMessage.textContent = "Loading courses...";

    const courseData = await fetchAllCourses();

    loadingMessage.textContent = "";

    renderCourses(courseData);

}

loadCourses();
// Step 49 - Promise.all()

Promise.all([

    fetchUser(1),

    fetchUser(2)

]).then(users => {

    console.log("Promise.all Users:");

    users.forEach(user => {

        console.log(user.name);

    });

});
// -----------------------------
// Hands-On 4 - Task 2
// -----------------------------

async function apiFetch(url) {

    try {

        const response = await axios.get(url);

        return response.data;

    } catch (error) {

        throw new Error(error.message);

    }

}
async function loadNotifications(isRetry = false) {

    loadingMessage.textContent = "Loading notifications...";

    errorMessage.textContent = "";

    retryButton.style.display = "none";

    notificationContainer.innerHTML = "";

    // Bad URL on first load, correct URL on retry
    const url = isRetry
        ? "https://jsonplaceholder.typicode.com/posts?_limit=5"
        : "https://jsonplaceholder.typicode.com/nonexistent";

    try {

        const posts = await apiFetch(url);

        loadingMessage.textContent = "";

        posts.forEach(post => {

            const card = document.createElement("div");

            card.className = "notification-card";

            card.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            notificationContainer.appendChild(card);

        });

    } catch (error) {

        loadingMessage.textContent = "";

        errorMessage.textContent =
            "Unable to load notifications.";

        retryButton.style.display = "block";

    }

}

loadNotifications();

retryButton.addEventListener("click", () => {

    loadNotifications(true);

});
async function loadUserPosts() {

    try {

        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    userId: 1
                }
            }
        );

        console.log("Posts of User 1");

        console.table(response.data);

    } catch (error) {

        console.error(error);

    }

}

loadUserPosts();