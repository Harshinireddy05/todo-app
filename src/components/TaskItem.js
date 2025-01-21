import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, toggleImportant, deleteTask } from '../redux/actions';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();

    return (
        <div className="task-item">
            <div 
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => dispatch(toggleTask(task.id))}
            >
                {task.completed && '✓'}
            </div>
            
            <div className="task-content">
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                </span>
                
                <div className="task-actions">
                    <button 
                        onClick={() => dispatch(toggleImportant(task.id))}
                        className={`icon-button ${task.important ? 'star-active' : ''}`}
                        title={task.important ? "Remove from important" : "Mark as important"}
                    >
                        {task.important ? <FaStar /> : <FaRegStar />}
                    </button>
                    
                    <button 
                        onClick={() => dispatch(deleteTask(task.id))}
                        className="icon-button"
                        title="Delete task"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;