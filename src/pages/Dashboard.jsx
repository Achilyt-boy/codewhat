import { useState } from "react";

const Dashboard = () => {
    //define user state
    const [user,setUser]=useState({
        name:'Mugabe',
        email:'mugabe@gmail.com'
    })
  return (
    <div style={{minHeight:'500px'}}>
      <h2>Welcome back {user.name}</h2>
      <h2>Your email:{user.email}</h2>
    </div>
  );
};
export default Dashboard;