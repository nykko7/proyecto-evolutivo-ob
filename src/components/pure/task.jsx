import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// ? Models
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';

// ? Styles
import '../../styles/task.scss';

const TaskComponent = ({ task, complete, remove }) => {
	useEffect(() => {
		console.log('Created Task');

		return () => {
			console.log(`Task: ${task.name} is going to unmount`);
		};
	}, [task]);

	// Function that returns a Badge depending on the level of the task
	function taskLevelBadge() {
		const capitalizedLevel =
			task.level.charAt(0).toUpperCase() + task.level.slice(1);
		switch (task.level) {
			case LEVELS.NORMAL:
				return (
					<h6 className='mb-0'>
						<span className='badge bg-primary'>{capitalizedLevel}</span>
					</h6>
				);
			case LEVELS.URGENT:
				return (
					<h6 className='mb-0'>
						<span className='badge bg-warning'>{capitalizedLevel}</span>
					</h6>
				);
			case LEVELS.BLOCKING:
				return (
					<h6 className='mb-0'>
						<span className='badge bg-danger'>{capitalizedLevel}</span>
					</h6>
				);
			default:
				break;
		}
	}

	// Function that returns a Icon depending on the status of the task
	function taskCompletedIcon() {
		return task.isCompleted ? (
			<i
				onClick={() => complete(task)}
				className='bi-toggle-on task-action'
				style={{ fontWeight: 'bold', color: 'green' }}
			></i>
		) : (
			<i
				onClick={() => complete(task)}
				className='bi-toggle-off task-action'
				style={{ fontWeight: 'bold', color: 'white' }}
			></i>
		);
	}

	const taskCompleted = {
		color: 'gray',
		fontWeight: 'bold',
		textDecoration: 'line-through',
	};

	return (
		<tr className='fw-normal' style={task.isCompleted ? taskCompleted : null}>
			<th>
				<span className=''>{task.name}</span>
			</th>
			<td className='align-middle'>
				<span>{task.description}</span>
			</td>
			<td className='align-middle'>
				{/* Execution of function to return badge element */}
				{taskLevelBadge()}
			</td>
			<td className='align-middle'>
				{/* Execution of function to return icon depending on completion */}
				{taskCompletedIcon()}
				<i
					onClick={() => remove(task)}
					className='bi-trash  task-action'
					style={{ fontWeight: 'bold', color: 'tomato' }}
				></i>
			</td>
		</tr>
		// <div>
		// 	<h2>Nombre: {task.name}</h2>
		// 	<h3>Descripcion: {task.description}</h3>
		// 	<h4>Level: {task.level}</h4>
		// 	<h5>This task is: {task.isCompleted ? 'Completed' : 'Not completed'}</h5>
		// </div>
	);
};

TaskComponent.propTypes = {
	task: PropTypes.instanceOf(Task).isRequired,
	complete: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
};

export default TaskComponent;
