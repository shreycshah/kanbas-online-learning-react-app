import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};
export const submitQuizResponse = async (quizSubmission: any) => {
    const response = await axios.post(
        `${QUIZZES_API}/submission`,
        quizSubmission
    );
    return response.data;
};
export const findAttemptsForQuizByUser = async (quizId: any, userId: string) => {
    const response = await axios.post(
        `${QUIZZES_API}/attempt`,
        { "quizId": quizId, "userId": userId }
    );
    return response.data;
};
export const getQuizAttemptsForUserForCourse = async (courseId: any, userId: string) => {
    const response = await axios.post(
        `${QUIZZES_API}/all-attempts-for-course`,
        { "courseId": courseId, "userId": userId }
    );
    return response.data;
};