import './App.css';
import TaskListComponent from './components/container/task_list';
// import RegisterComponent from './components/pure/forms/registerFormik';
// import LoginComponent from './components/pure/forms/loginFormik';
import TasklistFormik from './components/container/taskListFormik';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				{/* Ejemplos de uso de Formik y Yup */}
				<TasklistFormik />
				{/* <RegisterComponent /> */}
				{/* <LoginComponent /> */}

				{/* Tasklist Container */}
				{/* <TaskListComponent /> */}
			</header>
		</div>
	);
}

export default App;
