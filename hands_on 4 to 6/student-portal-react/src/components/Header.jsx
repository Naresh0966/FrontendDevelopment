function Header({ siteName, enrolledCount }) {
  return (
    <header className="header">
      <div>
        <h1>{siteName}</h1>
      </div>

      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>

      <div className="enrolled">
        Enrolled Courses: {enrolledCount}
      </div>
    </header>
  );
}

export default Header;