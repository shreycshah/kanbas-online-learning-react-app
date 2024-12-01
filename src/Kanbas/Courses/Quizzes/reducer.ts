// In your reducer file (e.g., reducer.ts or quizzesSlice.ts)

import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
    _id: string;
    title: string;
    course: string;
    quizType: string;
    points: string;
    assignmentGroup: string;
    settings: {
        shuffleAnswers: boolean;
        timeLimit: number;
        multipleAttempts: {
            enabled: boolean;
            attemptsAllowed: number;
        };
        showCorrectAnswers: {
            enabled: boolean;
            timing: string;
        };
        accessCode: string;
        oneQuestionAtATime: boolean;
        webcamRequired: boolean;
        lockQuestionsAfterAnswering: boolean;
    };
    dates: {
        dueDate: string;
        availableDate: string;
        availableTime: string;
        dueTime: string;
        untilDate: string;
        untilTime: string;
    };
    isPublished: boolean;
    questions: Array<{ q_id: string; [key: string]: any }>;
    desc: string;
    totQuestions: string;
}

// Define your initial state
export const initialState: { quizzes: Quiz[] } = {
    quizzes: [
        {
            "_id": "A101",
            "title": "Propulsion Assignment",
            "course": "RS101",
            "quizType": "Graded Quiz",
            "assignmentGroup": "QUIZZES",
            "settings": {
                "shuffleAnswers": true,
                "timeLimit": 20,
                "multipleAttempts": {
                    "enabled": true,
                    "attemptsAllowed": 0,
                },
                "showCorrectAnswers": {
                    "enabled": true,
                    "timing": "",
                },
                "accessCode": "",
                "oneQuestionAtATime": true,
                "webcamRequired": true,
                "lockQuestionsAfterAnswering": true,
            },
            "dates": {
                "availableDate": "2024-05-06",
                "availableTime": "12:00 AM",
                "dueDate": "2024-05-13",
                "dueTime": "12:00 AM",
                "untilDate": "2024-05-06",
                "untilTime": "12:00 AM",
            },
            "points": "100",
            "desc": "The assignment is available online. Submit a link to the landing page of courses.",
            "isPublished": false,
            "totQuestions": "10 Questions",
            "questions": [],
        },
        {
            "_id": "A102",
            "title": "Aerodynamics Quiz",
            "quizType": "",
            "assignmentGroup": "",
            "course": "RS102",
            "settings": {
                "shuffleAnswers": true,
                "timeLimit": 0,
                "multipleAttempts": {
                    "enabled": true,
                    "attemptsAllowed": 0,
                },
                "showCorrectAnswers": {
                    "enabled": true,
                    "timing": "",
                },
                "accessCode": "",
                "oneQuestionAtATime": true,
                "webcamRequired": true,
                "lockQuestionsAfterAnswering": true,
            },
            "dates": {
                "availableDate": "2024-06-01",
                "availableTime": "12:00 AM",
                "dueDate": "2024-06-07",
                "dueTime": "5:00 PM",
                "untilDate": "2024-06-01",
                "untilTime": "9:00 AM",
            },
            "points": "80",
            "desc": "A quiz about aerodynamics. Complete it by the due date.",
            "isPublished": true,
            "totQuestions": "10 Questions",
            "questions": [],
        }
    ],
};

// Create the slice
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            state.quizzes.push(quiz);
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: updatedQuiz }) => {
            state.quizzes = state.quizzes.map((q) =>
                q._id === updatedQuiz._id ? updatedQuiz : q
            );
        },
        addQuestionToQuiz: (state, { payload }) => {
            const { quizId, question } = payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions.push(question);
            }
        },
        updateQuestionInQuiz: (state, { payload }) => {
            const { quizId, question } = payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions = quiz.questions.map((q) =>
                    q.q_id === question.q_id ? question : q
                );
            }
        },
        deleteQuestionFromQuiz: (state, { payload }) => {
            const { quizId, questionId } = payload;
            const quiz = state.quizzes.find((q) => q._id === quizId);
            if (quiz) {
                quiz.questions = quiz.questions.filter((q) => q.q_id !== questionId);
            }
        },
    },
});

export const {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    addQuestionToQuiz,
    updateQuestionInQuiz,
    deleteQuestionFromQuiz,
} = quizzesSlice.actions;

// Export the reducer and initialState
export default quizzesSlice.reducer;
