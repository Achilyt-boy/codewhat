import React from "react";

function CourseCard({ title, category, instructor, price }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
        {category}
      </span>

      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-sm text-slate-600">Instructor: {instructor}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-lg font-bold text-emerald-700">${price}</span>

        <button
          type="button"
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Enroll
        </button>
      </div>
    </article>
  );
}

export default CourseCard;