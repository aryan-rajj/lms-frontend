import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
const Positioning = () => {
  return (
    <HomeLayout>
      <div className="max-w-50vh flex items-center justify-center relative rounded-xl shadow-lg p-6 bg-white space-y-4">
        {/* Title Section */}
        <div className="flex flex-col items-center justify-between ">
          <h2 className="text-xl font-bold text-gray-800 absolute top-0 left-10 -rotate-12 ">Total Sales</h2>
          <span className="text-green-600 font-semibold absolute top-5 left-10 rotate-45 ">+18%</span>
        </div>

        {/* Content Section */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">₹</div>
          <div>
            <p className="text-md  font-bold text-gray-900 absolute right-0 top-0 mt-12 mr-80  -rotate-180">₹25,400</p>
            <p className="text-gray-500 text-sm">This Month</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-end">
          <button className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
            View Report
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Positioning;
