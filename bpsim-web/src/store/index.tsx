import { configureStore } from "@reduxjs/toolkit";
import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { modelReducer } from "./reducers/modelReducer";
import { nodeReducer } from "./reducers/nodeReducer";
import { nodeDetailsReducer } from "./reducers/nodeDetailsReducer";
import { resourceReducer } from "./reducers/resourceRedicer";
import { measureReducer } from "./reducers/measureReducer";
import { nodeResReducer } from "./reducers/nodeResReducer";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
        model: modelReducer,
        node: nodeReducer,
        nodeDetails: nodeDetailsReducer,
        resource: resourceReducer,
        measure: measureReducer,
        nodeRes: nodeResReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});