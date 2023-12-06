import {configureStore} from '@reduxjs/toolkit';
import {TraductionBackendApiSlice} from "./slices/TraductionBackendSlice";
import AuthReducer from '../app/slices/AuthSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        [TraductionBackendApiSlice.reducerPath]: TraductionBackendApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(TraductionBackendApiSlice.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

