import { RequestStatus } from '../../../types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../../utils';
import {
	fetchAddReviewProductById,
	fetchAverageRatingProduct,
	fetchDetailProduct,
	fetchReviewsProduct,
} from './thunk';
import { AverageRating } from '../../../utils/api/productsApi';

interface DetailProductState {
	info: IProduct | null;
	rating: AverageRating | null;
	reviews: IReview[] | null;
	status: RequestStatus;
}

const initialState: DetailProductState = {
	info: null,
	rating: null,
	reviews: null,
	status: RequestStatus.Idle,
};

const USER_SLICE_NAME = 'detail-product';
export const detailProductSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		update: (state, action: PayloadAction<IProduct>) => {
			state.info = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailProduct.fulfilled, (state, action) => {
				state.info = action.payload;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchAverageRatingProduct.fulfilled, (state, action) => {
				state.rating = action.payload;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchReviewsProduct.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.status = RequestStatus.Success;
			})
			.addCase(fetchAddReviewProductById.fulfilled, (state) => {
				state.status = RequestStatus.Success;
			})
			.addCase(fetchDetailProduct.rejected, (state) => {
				state.info = null;
			})
			.addMatcher(isActionPending(detailProductSlice.name), (state) => {
				state.status = RequestStatus.Loading;
			})
			.addMatcher(isActionRejected(detailProductSlice.name), (state) => {
				state.status = RequestStatus.Failed;
			});
	},

	selectors: {
		getInfo: (state: DetailProductState) => state.info,
		getStatus: (state: DetailProductState) => state.status,
		getReviews: (state: DetailProductState) => state.reviews,
		getAverageRating: (state: DetailProductState) => state.rating,
	},
});
