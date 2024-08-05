import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../types/store';

const config = {
	apiUrl: 'https://api.v2.react-learning.ru',
};

export const customBaseQuery = fetchBaseQuery({
	baseUrl: config.apiUrl,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).user.accessToken;

		if (accessToken) {
			headers.set('authorization', accessToken);
		}
		return headers;
	},
});
