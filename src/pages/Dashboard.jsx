import { useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Mugabe",
    email: "mugabe@gmail.com",
  });

  const completedCourses = [
    { title: "React Foundamentals", category: "Frontend", progress: 100 },
    { title: "Nodejs", category: "Backend", progress: 100 },
  ];

  const upcomingCourses = [
    { title: "Database foundamental", category: "Database", progress: 55 },
    { title: "English", category: "Languages", progress: 20 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Enroll Now
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              View Calendar
            </button>
          </div>
        </header>

        <main className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">In Progress</h2>
            <p className="mt-1 text-sm text-slate-500">
              Continue learning where you left off.
            </p>

            <div className="mt-6 space-y-5">
              {completedCourses.map((course) => (
                <div
                  key={course.title}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.category}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">Upcoming</h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick up new skills next.
            </p>

            <div className="mt-6 space-y-5">
              {upcomingCourses.map((course) => (
                <div
                  key={course.title}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.category}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">Quick Stats</h2>
          <p className="mt-1 text-sm text-slate-500">
            Track your progress across today&apos;s learning goals.
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                Courses Enrolled
              </dt>
              <dd className="mt-1 text-2xl font-bold text-slate-900">5</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                Completed
              </dt>
              <dd className="mt-1 text-2xl font-bold text-slate-900">2</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium text-slate-500">
                In Progress
              </dt>
              <dd className="mt-1 text-2xl font-bold text-slate-900">3</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;