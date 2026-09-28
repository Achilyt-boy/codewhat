import { useState } from "react";
import CourseCard from "./CourseCard";

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

function highlightMatches(value, search) {
  const normalizedValue = value.toLowerCase();
  const normalizedSearch = search.toLowerCase();

  if (!normalizedSearch.trim()) {
    return value;
  }

  const regex = new RegExp(
    normalizedSearch
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .split("")
      .map((char, index, array) => {
        if (index === array.length - 1) {
          return char;
        }
        return `${char}[^${char}]*?`;
      })
      .join("|"),
    "g"
  );

  const matches = normalizedValue.matchAll(regex);
  const highlighted = [];
  let lastIndex = 0;

  for (const match of matches) {
    highlighted.push(value.slice(lastIndex, match.index));
    highlighted.push(
      <mark key={match.index} className="bg-yellow-200 text-yellow-900">
        {value.slice(match.index, match.index + match[0].length)}
      </mark>
    );
    lastIndex = match.index + match[0].length;
  }

  highlighted.push(value.slice(lastIndex));
  return highlighted;
}

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Available courses
        </h2>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <label
            htmlFor="course-search"
            className="text-sm font-medium text-slate-700"
          >
            Search:
          </label>
          <input
            id="course-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by title..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 sm:max-w-sm"
          />
        </div>

        {filteredCourses.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No courses available.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course, index) => {
              const highlightedTitle = searchTerm.trim()
                ? highlightMatches(course.title, searchTerm)
                : course.title;

              return (
                <CourseCard
                  key={`${course.title}-${index}`}
                  title={course.title}
                  highlightedTitle={highlightedTitle}
                  category={course.category}
                  instructor={course.instructor}
                  price={course.price}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
