import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programs = [
  {
    icon: "💻",
    title: "Web Development",
    description:
      "Master HTML, CSS, JavaScript and modern frameworks like React to build responsive, real-world websites and web apps.",
    duration: "6 Months",
    level: "Beginner Friendly",
  },
  {
    icon: "📊",
    title: "Data Science",
    description:
      "Learn Python, data analysis, visualization and machine learning to turn raw data into powerful insights.",
    duration: "8 Months",
    level: "Intermediate",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Build cross-platform mobile applications using React Native and ship them to both Android and iOS stores.",
    duration: "6 Months",
    level: "Intermediate",
  },
  {
    icon: "🔐",
    title: "Cybersecurity",
    description:
      "Understand network security, ethical hacking and best practices to protect systems from modern threats.",
    duration: "9 Months",
    level: "Advanced",
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    description:
      "Dive into artificial intelligence, neural networks and deep learning to build intelligent applications.",
    duration: "10 Months",
    level: "Advanced",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    description:
      "Learn cloud infrastructure, CI/CD pipelines and containerization to deploy and scale modern applications.",
    duration: "7 Months",
    level: "Intermediate",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Our <span className="text-sky-400">Programs</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-300 text-lg">
          Choose from industry-focused programs designed to take you from
          beginner to job-ready, bridging learning to real careers.
        </p>
      </section>

      {/* Programs Grid */}
      <section className="flex-1 max-w-6xl w-full mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 flex flex-col border border-slate-200"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {program.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                {program.description}
              </p>
              <div className="flex items-center justify-between mt-5 text-xs font-medium">
                <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                  {program.duration}
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  {program.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 text-white py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Ready to start your journey?
        </h2>
        <p className="text-slate-300 mb-6">
          Register today and take the first step toward your dream tech career.
        </p>
        <a
          href="/register"
          className="inline-block bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Register Now
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
