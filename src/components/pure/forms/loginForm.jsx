// Componente que renderiza el formulario para autenticacion de usuarios

import React, { useState } from 'react';

const LoginForm = () => {
	const initialCredentials = [
		{
			user: '',
			password: '',
		},
	];

	const [credentials, setCredentials] = useState(initialCredentials);

	return <div>LoginForm</div>;
};

export default LoginForm;
