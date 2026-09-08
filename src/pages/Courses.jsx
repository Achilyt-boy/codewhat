import CourseCard from "../components/CourseCard";

function Courses() {
  //data list:

  const courseList = [
    {
      category: "Frontend",
      title: "React Foundamentals",
      instructor: "Kevin",
      price: 29.99,
    },

    {
      category: "Backend",
      title: "Nodejs",
      instructor: "Peter",
      price: 29.99,
    },
    {
      category: "Frontend",
      title: "React Foundamentals",
      instructor: "Muhashyi",
      price: 29.99,
    },
    {
      category: "Database",
      title: "Database foundamental",
      instructor: "Kalisa",
      price: 29.99,
    },
    {
      category: "Languages",
      title: "English",
      instructor: "Mugisha",
      price: 44.99,
    },
  ];

  return (
    <div style={{ padding: "p30", maxWidth: "1000px", margin: "auto" }}>
      <h2>Available courses</h2>

      {courseList.length === 0 ? (
        <p style={{ color: "#6483b" }}>No courses Available</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {/* Display data */}
          {courseList.map((course) => {
            <div key={course.title}>
              {course.isFeatured && (
                <span style={{ color: "Yellow" }}>Featured</span>
              )}
              <CourseCard
                title={course.title}
                category={course.category}
                instructor={course.instructor}
                price={course.price}
              ></CourseCard>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}
