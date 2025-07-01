import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { createAccount } from "../../Redux/AuthSlice.js";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }
  function getImage(event) {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignUpData({
        ...signUpData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }
  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signUpData.fullName ||
      !signUpData.password ||
      !signUpData.avatar ||
      !signUpData.email
    ) {
      toast.error("Please fill all the details");
      return;
    }
    if (signUpData.fullName.length < 6) {
      toast.error("Name should be greater then 6 char");
      return;
    }
    if (
      !signUpData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email id");
      return;
    }
    if (
      !signUpData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character"
      );
      return;
    }
    const formData = FormData();
    formData.append("fullName", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("avatar", signUpData.avatar);
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");

    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <>
      <HomeLayout>
        <div className="flex h-[100vh] overflow-x-auto items-center justify-center">
          <form onSubmit={createNewAccount} className="flex flex-col justify-center gap-2 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
            <h1 className="text-3xl text-yellow-300 text-center font-bold">
              Registration Page
            </h1>
            <label htmlFor="image_uploads">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              className="hidden "
              name="image_uploads"
              id="image_uploads"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImage}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="fullName"
                className="bg-transparent px-2 py-1 border rounded-sm "
                placeholder="Enter Your Name.."
                onChange={handleUserInput}
                value={signUpData.fullName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email.."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signUpData.email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password.."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signUpData.password}
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            >
              Create account
            </button>

            <p className="text-center">
              Already have an account ?{" "}
              <Link to="/login" className="link text-accent cursor-pointer">
                Login
              </Link>
            </p>
          </form>
        </div>
      </HomeLayout>
    </>
  );
};

export default SignUp;
