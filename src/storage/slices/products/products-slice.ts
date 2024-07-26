import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../types/store';
import {
	fetchChangeLikeProduct,
	fetchDeleteProduct,
	fetchProducts,
} from './thunk';
import { isActionPending, isActionRejected } from '../../../utils';

interface ProductsState {
	data: IProduct[];
	length: number;
	status: RequestStatus;
	searchTerm: string;
}

const initialState: ProductsState = {
	data: [],
	length: 0,
	status: RequestStatus.Idle,
	searchTerm: '',
};

const USER_SLICE_NAME = 'products';
export const productsSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		updateSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				const { products, length } = action.payload;
				state.data = products;
				state.length = length;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
				state.data = state.data.filter(
					(product) => product.id !== action.payload.id
				);
				state.length -= 1;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
				state.data = state.data.map((currentProduct) =>
					currentProduct.id === action.payload.id
						? action.payload
						: currentProduct
				);
				state.status = RequestStatus.Success;
			})
			.addMatcher(isActionPending(productsSlice.name), (state) => {
				state.status = RequestStatus.Loading;
			})
			.addMatcher(isActionRejected(productsSlice.name), (state) => {
				state.status = RequestStatus.Failed;
			});
	},

	selectors: {
		getProduct: (state) => state.data,
		getProductLength: (state) => state.length,
		getSearchTerm: (state) => state.searchTerm,
		getStatus: (state) => state.status,
	},
});
