import { configureStore } from "@reduxjs/toolkit";
import { subjectAreaReducer } from "./reducers/subjectAreaReducer";
import { modelReducer } from "./reducers/modelReducer";
import { nodeReducer } from "./reducers/nodeReducer";
import { nodeDetailsReducer } from "./reducers/nodeDetailsReducer";
import { resourceReducer } from "./reducers/resourceRedicer";
import { measureReducer } from "./reducers/measureReducer";

export const store = configureStore({
    reducer: {
        subjectArea: subjectAreaReducer,
        model: modelReducer,
        node: nodeReducer,
        nodeDetails: nodeDetailsReducer,
        resource: resourceReducer,
        measure: measureReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});