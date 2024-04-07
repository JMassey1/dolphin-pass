const ErrorTypes = {
	SIGNUP_BAD_USERNAME: 'signup_bad_username',
	SIGNUP_BAD_PASSWORD: 'signup_bad_password',
	SIGNUP_USERNAME_TAKEN: 'signup_username_taken',
	LOGIN_BAD_CREDENTIALS: 'login_bad_credentials',
	INTERNAL_ERROR: 'internal_error'
} as const;

export default ErrorTypes;
