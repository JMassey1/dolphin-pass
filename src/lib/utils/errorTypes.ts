const ErrorTypes = {
	SIGNUP_BAD_USERNAME: {
		message: 'Username is formatted incorrectly.'
	},
	SIGNUP_BAD_PASSWORD: {
		message: 'Password is formatted incorrectly.'
	},
	SIGNUP_USERNAME_TAKEN: {
		message: 'Username is already taken.'
	},
	SIGNUP_PASSWORDS_DO_NOT_MATCH: {
		message: 'Passwords do not match.'
	},
	LOGIN_BAD_CREDENTIALS: {
		message: 'Incorrect username or password.'
	},
	NO_LOGIN: {
		message: 'User not logged in.'
	},
	USER_NOT_FOUND: {
		message: 'User not found.'
	},
	INTERNAL_ERROR: {
		message: 'Internal server error.'
	}
} as const;

export default ErrorTypes;
