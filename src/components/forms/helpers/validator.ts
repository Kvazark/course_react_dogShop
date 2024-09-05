import * as yup from 'yup';
import { SIGN_UP_FORM_SETTINGS } from '../SignupForm/helpers/constants';

export const signInFormSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).max(24).required(),
});

export const signUpFormSchema = yup.object({
	email: yup
		.string()
		.email(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL)
		.required(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.EMAIL),
	password: yup
		.string()
		.min(
			SIGN_UP_FORM_SETTINGS.BOUNDARIES.PASSWORD.MIN,
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MIN
		)
		.max(
			SIGN_UP_FORM_SETTINGS.BOUNDARIES.PASSWORD.MAX,
			SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.MAX
		)
		.required(SIGN_UP_FORM_SETTINGS.ERROR_MESSAGES.PASSWORD.REQUIRED),
});
