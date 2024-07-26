import { configureStore } from '@reduxjs/toolkit';
import api from '../utils/api/productsApi';
import rootReducer from './slices';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
		}),
});

export default store;
