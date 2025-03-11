import { configureStore } from "@reduxjs/toolkit";
import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { modelReducer } from "./reducers/modelReducer";
import { nodeReducer } from "./reducers/nodeReducer";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
        model: modelReducer,
        node: nodeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});