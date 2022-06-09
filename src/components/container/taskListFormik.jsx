import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useList from '../../hooks/useList';
import { LEVELS } from '../../models/levels.enum';

const TasklistFormik = () => {
	const TaskSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		description: Yup.string()
			.min(2, 'Too Short!')
			.max(100, 'Too Long!')
			.required('Required'),
	});
	const defaultTask = {
		name: 'Formik',
		description: 'Formulario con Formik',
		level: LEVELS.URGENT,
		done: false,
	};
	const tasks = useList([defaultTask]);

	return (
		<div>
			<h1 class='text-white'>Task List</h1>
			<Formik
				initialValues={{
					name: '',
					description: '',
					level: LEVELS.NORMAL,
					done: false,
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						tasks.push(values);
						actions.resetForm({});
						actions.setSubmitting(false);
					}, 500);
				}}
				validationSchema={TaskSchema}
			>
				{({ errors, touched }) => (
					<Form class='text-white d-flex flex-column'>
						<Field name='name' placeholder='Task Name' />
						{errors.name && touched.name && (
							<ErrorMessage name='name' component='div'></ErrorMessage>
						)}
						<Field name='description' placeholder='Task Description' />
						{errors.description && touched.description && (
							<ErrorMessage name='description' component='div'></ErrorMessage>
						)}

						<Field as='select' name='level'>
							<option value={LEVELS.NORMAL}>Normal</option>
							<option value={LEVELS.URGENT}>Urgent</option>
							<option value={LEVELS.BLOCKING}>Blocking</option>
						</Field>
						<button type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
			{tasks.isEmpty() ? (
				<p class='text-white'>Task List is Empty</p>
			) : (
				tasks.value.map((task, index) => (
					<li
						key={index}
						class='text-white'
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<input
							type='checkbox'
							onClick={() => tasks.remove(index)}
							checked={false}
						/>
						<p
							style={{
								fontWeight: 'bold',
								margin: '0px 5px',
							}}
						>
							{task.name} -
						</p>
						<p
							style={{
								marginBottom: '0px',
							}}
						>
							{task.description}
						</p>
					</li>
				))
			)}
		</div>
	);
};

export default TasklistFormik;
