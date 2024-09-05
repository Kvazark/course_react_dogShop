import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user/user-slice';
import { productsSlice } from './products/products-slice';
import { detailProductSlice } from './detailProduct/detail-product-slice';

const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[detailProductSlice.name]: detailProductSlice.reducer,
});

export default rootReducer;
