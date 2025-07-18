import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, updateProfile } from "../../../Redux/AuthSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    await dispatch(updateProfile([data.userId, formData]));

    await dispatch(getUserData());

    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col justify-center items-center gap-5 rounded-lg p-4 text-white shadow-[0_0_10px_black] min-h-[25rem] min-w-80">
            <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
            <label htmlFor="image_uploads" className="cursor-pointer">
              {data.previewImage ? (
                <img
                  src={data.previewImage}
                  className="w-28 h-28 rounded-full m-auto"
                />
              ) : (
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="image_uploads"
              accept=".jpg ,.png,.svg,.jpeg"
              name="image_uploads"
              onChange={handleImageUpload}
            />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-center rounded-sm text-lg font-semibold"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Your Name"
                className="bg-transparent px-2 py-1 border"
                value={data.fullName}
                onChange={handleInputChange}
              />
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 cursor-pointer rounded-s-md text-lg py-2">
              Update Profile
            </button>
            <Link to="/user/profile">
              <p className="link text-accent cursor-pointer flex items-center justify-center text">
                <AiOutlineArrowLeft /> Go back to profile
              </p>
            </Link>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
