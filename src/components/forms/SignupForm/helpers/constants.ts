export const SIGN_UP_FORM_SETTINGS = {
	TEST_IDS: {
		EMAIL: 'SIGN_UP_FORM_EMAIL_TEST_ID',
		PASSWORD: 'SIGN_UP_FORM_PASSWORD_TEST_ID',
		SUBMIT_BTN: 'SIGN_UP_FORM_SUBMIT_BTN_TEST_ID',
		FORM_TITLE: 'SIGN_UP_FORM_TITLE_TEST_ID',
	},
	ERROR_MESSAGES: {
		EMAIL: 'Укажите корректный Email',
		PASSWORD: {
			MIN: 'Минимальная длина пароля 8 символа(ов)',
			MAX: 'Максимальная длина пароля 24 символа(ов)',
			REQUIRED: 'Введите корректный пароль',
		},
	},
	BOUNDARIES: {
		PASSWORD: {
			MIN: 8,
			MAX: 24,
		},
	},
};
