import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';

const TaskInput = () => {
    const [taskText, setTaskText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            dispatch(addTask({
                id: Date.now(),
                text: taskText,
                completed: false,
                important: false,
                createdAt: new Date().toISOString()
            }));
            setTaskText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-input-container">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a Task"
                className="task-input"
            />
            <button type="submit" className="add-task-button">
                ADD TASK
            </button>
        </form>
    );
};

export default TaskInput;