// Action Types
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_IMPORTANT = 'TOGGLE_IMPORTANT';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const SET_VIEW = 'SET_VIEW';

// Action Creators
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId
});

export const toggleTask = (taskId) => ({
    type: TOGGLE_TASK,
    payload: taskId
});

export const toggleImportant = (taskId) => ({
    type: TOGGLE_IMPORTANT,
    payload: taskId
});

export const toggleTheme = () => ({
    type: TOGGLE_THEME
});

export const login = (credentials) => ({
    type: LOGIN,
    payload: credentials
});

export const logout = () => ({
    type: LOGOUT
});

export const fetchWeather = (location) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`YOUR_WEATHER_API_ENDPOINT/${location}`);
            const data = await response.json();
            dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
        }
    };
};

export const setView = (view) => ({
    type: SET_VIEW,
    payload: view
});