import './home.css'
import Hero from '../components/Hero';
import Courses from '../components/Courses'
const Home = () => {
  const platFormName = "Learning Platform";
  const coursePeriod = 12;
  const highlights = ["Live Sessions", "Mentorship", "Support 24/7"];

  return (
    <>
      <div className="home">
        <h1 className="home-title">Welcome back to {platFormName}</h1>
        <p className="home-subtitle">Your gateway to master React JS ({coursePeriod}-week program)</p>
        <div className="home-card">
          <h2 className="home-heading">Platform Highlights</h2>
          <ul className="home-list">
            {highlights.map((item, index) => (
              <li key={index} className="home-list-item">{item}</li>
            ))}
          </ul>
        </div>
        <Hero />
      <main style={{ padding: '30px', textAlign: 'center' }}>
        <p>Select a course below to begin learning.</p>        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          
          <Courses/>
          
          {/* <CourseCard 
            title="React JS Fundamentals" 
            category="Frontend" 
            instructor="Fidele" 
            price="49.99" 
          />
          <CourseCard 
            title="Node.js & Express API" 
            category="Backend" 
            instructor="Fidele" 
            price="59.99" 
          />
          <CourseCard 
            title="Database Design with MySQL" 
            category="Database" 
            instructor="Fidele" 
            price="39.99" 
          /> */}
        </div>
      </main>
      </div>

  
    </>
  );
};

export default Home;