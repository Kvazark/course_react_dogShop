import { objectHasProperty } from './commonUtils';

export const getMessageFromError = (
	error: unknown,
	defaultErrorMessage: string
) => {
	if (objectHasProperty(error, 'message') && typeof error.message === 'string')
		return error.message;

	return defaultErrorMessage;
};
