import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { getUserData } from "../../../Redux/AuthSlice";
import { cancelCourseBundle } from "../../../Redux/PaymentSlice";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  // function to handle the cancel subscription of course
  async function handleCancellation() {
    // toast.loading("Initiating cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  }

  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center w-auto justify-center ">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border-black"
          />
          <h3 className="text-center text-2xl font-semibold capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <div className="text-center">Email: </div>
            <div className="text-center">{userData?.email}</div>
            <div className="text-center">Role: </div>
            <div className="text-center">{userData?.role}</div>
            <div className="text-center">Subscription: </div>
            <div className="text-center">
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Link
              to="/change-password"
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300 font-semibold py-2 rounded-sm text-center"
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300 font-semibold py-2 rounded-sm text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            // <Link to="/cancel-subscription">
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-md cursor-pointer py-2 text-center "
            >
              Cancel Subscription
            </button>
            // {/* </Link> */}
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
