import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import SignUp from "./Pages/SignUp.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Login from "./Pages/Login.jsx";
import CourseList from "./Pages/Course/CourseList.jsx";
import Contact from "./Pages/Contact.jsx";
import Denied from "./Pages/Denied.jsx";
import CourseDescription from "./Pages/Course/CourseDescription.jsx";
import RequiredAuth from "./Components/Auth/RequiredAuth.jsx";
import CreateCourse from "./Pages/CreateCourse.jsx";
import Profile from "./Pages/User/Profile.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Checkout from "./Pages/Payment/Checkout.jsx";
import CheckoutSuccess from "./Pages/Course/CheckoutSuccess.jsx";
import CheckoutFailure from "./Pages/Course/CheckoutFailure.jsx";
import DisplayLeactures from "./Pages/Dashboard/DisplayLeactures.jsx";
import AddLecture from "./Pages/Dashboard/AddLecture.jsx";
import ForgetPassword from "./Pages/Password/ForgetPassword.jsx";
import ResetPassword from "./Pages/Password/ResetPassword.jsx";
import ChangePassword from "./Pages/Password/ChangePassword.jsx";
import AdminCourseCreate from "./Pages/AdminDashboard/AdminCourseCreate.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

      <Route path="/courses" element={<CourseList />}></Route>
      <Route path="/course/description" element={<CourseDescription />}></Route>
      <Route element={<RequiredAuth element={["ADMIN"]} />}>
        <Route path="/admin/dashboard" element={<AdminCourseCreate />}></Route>
        <Route path="/course/create" element={<CreateCourse />}></Route>
        <Route path="/course/addlecture" element={<AddLecture />}></Route>
      </Route>
      <Route element={<RequiredAuth element={["USER", "ADMIN"]} />}>
        <Route path="/user/profile" element={<Profile />}></Route>
        <Route path="/user/editprofile" element={<EditProfile />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
        <Route path="/checkout/fail" element={<CheckoutFailure />}></Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/course/displaylectures"
          element={<DisplayLeactures />}
        ></Route>
      </Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/denied" element={<Denied />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
