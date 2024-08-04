import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './slices/user/user-slice';
import { authApi } from './api/authApi';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { productsApi } from '../api/products';
import { productsSlice } from './slices/products/products-slice';
import { detailProductSlice } from './slices/detailProduct/detail-product-slice';
import { userApi } from '../api/user';

const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[detailProductSlice.name]: detailProductSlice.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	// сетевые данные в localStorage не сохраняем
	blacklist: [authApi.reducerPath, productsApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([authApi.middleware, productsApi.middleware, userApi.middleware]),
});

export const persistor = persistStore(store);
export default store;
