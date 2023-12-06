import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
    const persistedData = localStorage.getItem('authPersistedData');

    if (persistedData) {
        return JSON.parse(persistedData);
    }

    return {
        isAuthenticated: false
    }
}

const initialState: AuthState = getInitialState();

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser(state) {
            state.isAuthenticated = true;
            persistData(state);
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            eraseData();
        }
    }
});

const persistData = (state: AuthState) => {
    localStorage.setItem('authPersistedData', JSON.stringify(state));
};

const eraseData = () => {
    localStorage.removeItem('authPersistedData');
};

export const {loginUser, logoutUser} = AuthSlice.actions;
export default AuthSlice.reducer;