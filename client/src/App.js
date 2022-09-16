import React ,{ useState } from "react";
import { Routes , Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-componet";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import AuthService from "./services/auth.service";

function App(){
  return(
    <div>
    <NavComponent/>
    <Routes>
      <Route exact path="/" element={<HomeComponent />}/>
      <Route exact path="/register" element={<RegisterComponent />}/>
      <Route exact path="/login" element={<LoginComponent />}/>
      <Route exact path="/profile" element={<ProfileComponent />}/>
      <Route exact path="/course" element={<CourseComponent />}/>
      <Route exact path="/postCourse" element={<PostCourseComponent />}/>
      <Route exact path="/enroll" element={<EnrollComponent />}/>
    </Routes>
    </div>
  );
}
export default App;