import React, { useState, useEffect } from 'react';
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.enum';
import TaskComponent from '../pure/task';
import TaskForm from '../pure/forms/taskForm';

function TaskListComponent() {
	const defaultTask1 = new Task(
		'Default task 1',
		'Default description 1',
		true,
		LEVELS.NORMAL,
	);
	const defaultTask2 = new Task(
		'Default task 2',
		'Default description 2',
		false,
		LEVELS.URGENT,
	);
	const defaultTask3 = new Task(
		'Default task 3',
		'Default description 3',
		true,
		LEVELS.BLOCKING,
	);
	const defaultTask4 = new Task(
		'Default task 4',
		'Default description 4',
		false,
		LEVELS.NORMAL,
	);

	// Estado del componente
	const [tasks, setTasks] = useState([
		defaultTask1,
		defaultTask2,
		defaultTask3,
		defaultTask4,
	]);
	const [isLoading, setIsLoading] = useState(true);

	//Control del ciclo de vida del componente
	useEffect(() => {
		console.log('Task State has been modified');
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		return () => {
			console.log('TaskList component is going to unmount');
		};
	}, [tasks]);

	function completeTask(task) {
		console.log('Complete this Task:', task);
		const index = tasks.indexOf(task);
		const tempTasks = [...tasks];
		tempTasks[index].isCompleted = !tempTasks[index].isCompleted;
		setTasks(tempTasks);
	}
	function removeTask(task) {
		console.log('Remove this Task:', task);
		const index = tasks.indexOf(task);
		const tempTasks = [...tasks];
		tempTasks.splice(index, 1);
		setTasks(tempTasks);
	}

	function addTask(task) {
		console.log('Added this Task:', task);
		const tempTasks = [...tasks];
		tempTasks.push(task);
		setTasks(tempTasks);
	}

	const Table = () => {
		return (
			<table className='table table-dark table-hover'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col' className='text-center'>
							Title
						</th>
						<th scope='col' className='text-center'>
							Description
						</th>
						<th scope='col' className='text-center'>
							Priority
						</th>
						<th scope='col' className='text-center'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{/* TODO: Aplicar un for/map para renderizar la lista */}
					{tasks.map((task, index) => (
						<TaskComponent
							key={index}
							task={task}
							complete={completeTask}
							remove={removeTask}
						/>
					))}
				</tbody>
			</table>
		);
	};

	let tasksTable = <Table />;

	if (tasks.length > 0) {
		tasksTable = <Table />;
	} else {
		tasksTable = (
			<div>
				<h5>There are no tasks to show</h5>
				<h6>Please, create one</h6>
			</div>
		);
	}

	const loadingStyle = {
		color: 'grey',
		fontSize: '2rem',
		fontWeight: 'bold',
	};

	return (
		<div className='col-12'>
			<div className='card text-white bg-dark mb-3'>
				{/* Card Header (title) */}
				<div className='card-header p-3'>
					<h4>Your Tasks:</h4>
				</div>
				{/* Card Body (content) */}
				<div
					className='card-body text-center'
					data-mdb-perfect-scrollbar='true'
					style={{ position: 'relative', height: '400px' }}
				>
					{/* Add loading spinner */}
					{isLoading ? (
						<p style={loadingStyle}>Loading tasks...</p>
					) : (
						tasksTable
					)}
				</div>
			</div>
			<TaskForm add={addTask} length={tasks.length}></TaskForm>
		</div>
	);
}

export default TaskListComponent;
