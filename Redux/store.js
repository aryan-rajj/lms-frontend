import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './AuthSlice.js';
import razorpaySliceReducer from "./PaymentSlice.js";
import courseSliceReducer from "./CourseSlice.js"
import lectureSliceReducer from "./LectureSlice.js"
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay:razorpaySliceReducer,
        lecture:lectureSliceReducer
    },
    devTools: true
});

export default store;