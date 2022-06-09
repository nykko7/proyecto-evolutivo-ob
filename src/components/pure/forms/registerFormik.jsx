import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Models
import { User } from '../../../models/user.class';
import { ROLES } from '../../../models/roles.enum';

const registerFormik = () => {
	const user = new User();

	const initialValues = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: ROLES.USER,
	};

	const registerSchema = Yup.object().shape({
		username: Yup.string()
			.min(6, 'Username too short')
			.max(12, 'Username too long')
			.required('Username is required'),
		email: Yup.string()
			.email('Invalid email format')
			.required('Email is required'),
		role: Yup.string()
			.oneOf([ROLES.USER, ROLES.ADMIN], 'You must select a Role: User/Admin')
			.required('Role is required'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password too short'),
		confirmPassword: Yup.string()
			.when('password', {
				is: (value) => value && value.length > 0,
				then: Yup.string().oneOf(
					[Yup.ref('password')],
					'Passwords must match!',
				),
			})
			.required('You must confirm your password'),
	});

	const submit = (values) => {
		alert('register user');
	};

	return (
		<div>
			<h4 class='text-white'>Register Formik</h4>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema}
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 1000));
					alert(JSON.stringify(values, null, 2));
					localStorage.setItem('credentials', values);
				}}
			>
				{({
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
				}) => {
					return (
						<Form class='d-flex flex-column text-white'>
							<label htmlFor='username'>Username</label>
							<Field
								id='username'
								type='text'
								name='username'
								placeholder='Your Username'
							></Field>

							{/* Username Errors */}
							{errors.username && touched.username && (
								<ErrorMessage name='username' component='div'></ErrorMessage>
							)}

							<label htmlFor='email'>Email</label>
							<Field
								id='email'
								type='email'
								name='email'
								placeholder='example@email.com'
							></Field>

							{/* Email Errors */}
							{errors.email && touched.email && (
								<ErrorMessage name='email' component='div'></ErrorMessage>
							)}

							<label htmlFor='password'>Password</label>
							<Field
								id='password'
								type='password'
								name='password'
								placeholder='Your role'
							></Field>

							{/* Password Errors */}
							{errors.password && touched.password && (
								<ErrorMessage name='password' component='div'></ErrorMessage>
							)}

							<label htmlFor='confirmPassword'>Confirm your password</label>
							<Field
								id='confirmPassword'
								type='password'
								name='confirmPassword'
								placeholder='Confirm your password'
							></Field>

							{/* Password Errors */}
							{errors.confirmPassword && touched.confirmPassword && (
								<ErrorMessage
									name='confirmPassword'
									component='div'
								></ErrorMessage>
							)}

							<button type='submit'>Register Account</button>
							{isSubmitting ? <p>Sending your credentials...</p> : null}

							{/* <label  htmlFor='role'>User Role</label>
							<Field
								id='role'
								type='text'
								name='role'
								placeholder='Your role'
							></Field> */}
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default registerFormik;
