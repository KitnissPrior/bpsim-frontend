import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});