import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../redux/reducers';
import TaskItem from './TaskItem';

const TaskList = () => {
    const tasks = useSelector(selectTasks);
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="task-list-container">
            <div className="task-section">
                <h3>Tasks</h3>
                <div className="task-items">
                    {pendingTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>

            {completedTasks.length > 0 && (
                <div className="task-section">
                    <h3>Completed</h3>
                    <div className="task-items">
                        {completedTasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;