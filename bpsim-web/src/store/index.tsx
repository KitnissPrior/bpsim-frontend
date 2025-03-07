import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { modelReducer } from "./reducers/modelReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
        model: modelReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});