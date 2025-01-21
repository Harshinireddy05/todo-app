import {
    ADD_TASK,
    DELETE_TASK,
    TOGGLE_TASK,
    TOGGLE_IMPORTANT,
    TOGGLE_THEME,
    LOGIN,
    LOGOUT,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE
} from './actions';
import { format } from 'date-fns';

const initialState = {
    tasks: [],
    theme: 'light',
    isAuthenticated: false,
    user: null,
    currentView: 'all', // 'all', 'today', 'important', 'planned', 'assigned'
    weather: null,
    error: null,
    stats: {
        percentage: 0,
        pending: 0,
        completed: 0
    }
};

const isToday = (date) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return format(new Date(date), 'yyyy-MM-dd') === today;
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, {
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                    completed: false
                }]
            };

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case TOGGLE_TASK:
            const updatedTasks = state.tasks.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
            return {
                ...state,
                tasks: updatedTasks,
                stats: calculateStats(updatedTasks)
            };

        case TOGGLE_IMPORTANT:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, important: !task.important }
                        : task
                )
            };

        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };

        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };

        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                weather: action.payload,
                error: null
            };

        case FETCH_WEATHER_FAILURE:
            return {
                ...state,
                weather: null,
                error: action.payload
            };

        case 'SET_VIEW':
            return {
                ...state,
                currentView: action.payload
            };

        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };

        default:
            return state;
    }
};

const calculateStats = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return {
        percentage: total ? Math.round((completed / total) * 100) : 0,
        pending: total - completed,
        completed
    };
};

// Selectors
export const selectTasks = (state) => {
    const tasks = state.tasks;
    switch (state.currentView) {
        case 'today':
            return tasks.filter(task => isToday(task.createdAt));
        case 'important':
            return tasks.filter(task => task.important);
        case 'planned':
            return tasks.filter(task => task.dueDate);
        case 'assigned':
            return tasks.filter(task => task.assignedTo);
        default:
            return tasks;
    }
};

export const selectTaskStats = (state) => {
    const tasks = selectTasks(state);
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;
    
    return {
        completed,
        pending: total - completed,
        total,
        percentage
    };
};

export default rootReducer;