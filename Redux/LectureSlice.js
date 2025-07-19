import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = axiosInstance.get(`/courses/${cid}`);
      toast.promise(response, {
        loading: "Fetching course lectures",
        success: "Lectures fetched successfully",
        error: "Failed to load the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLeactures = createAsyncThunk(
  "/course/leacture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      console.log(formData);
      console.log(data);
      const response = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "adding course lectures",
        success: "Leacture added successfully",
        error: "Failed to add the lectures",
      });
      console.log("Responce",response);
      return (await response).data;
    } catch (error) {
      console.error("Response:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Unknown error occurred");
    }
  }
);
export const deleteCourseLectures = createAsyncThunk(
  "/course/lectures/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: "deleting course leactures",
        success: "Leactures deleted successfully",
        error: "Failed to delete the lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLeactures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});
export default lectureSlice.reducer;
