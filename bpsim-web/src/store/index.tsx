import { configureStore } from "@reduxjs/toolkit";
import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { modelReducer } from "./reducers/modelReducer";
import { nodeReducer } from "./reducers/nodeReducer";
import { nodeDetailsReducer } from "./reducers/nodeDetailsReducer";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
        model: modelReducer,
        node: nodeReducer,
        nodeDetails: nodeDetailsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});