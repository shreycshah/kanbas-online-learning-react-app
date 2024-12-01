import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
    enrollments: enrollments
};
const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: enrollment.user,
                course: enrollment.course
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        unenroll: (state, { payload: enrollment }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => !(e.user === enrollment.user && e.course === enrollment.course)
            );
        },
    }
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;