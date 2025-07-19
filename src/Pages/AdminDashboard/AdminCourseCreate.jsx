import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";

const AdminCourseCreate = () => {
    const navigate=useNavigate();
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col justify-center items-center gap-5">
        <h1 className="text-green-400 flex flex-col h-8 w-full justify-center items-center text-xl">Admin Can Create New Courses</h1>
        <button
          onClick={() => {
            navigate("/course/create");
          }}
          className="btn btn-primary w-fit transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
        >
          Create New Course
        </button>
      </div>
    </HomeLayout>
  );
};

export default AdminCourseCreate;
