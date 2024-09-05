import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAverageRating } from '../../../api/interfaces';

interface DetailProductState {
	info: IProduct | null;
	rating: IAverageRating | null;
	reviews: IReview[] | null;
}

const createInitialState = (): DetailProductState => ({
	info: null,
	rating: null,
	reviews: null,
});

const PRODUCT_SLICE_NAME = 'detail-product';
export const detailProductSlice = createSlice({
	name: PRODUCT_SLICE_NAME,
	initialState: createInitialState(),
	reducers: {
		setProduct: (state, action: PayloadAction<IProduct>) => {
			state.info = action.payload;
		},
		setAverageRating: (state, action: PayloadAction<IAverageRating>) => {
			state.rating = action.payload;
		},
		setReviews: (state, action: PayloadAction<IReview[]>) => {
			state.reviews = action.payload;
		},
	},
	selectors: {
		getProduct: (state: DetailProductState) => state.info,
		getReviews: (state: DetailProductState) => state.reviews,
		getAverageRating: (state: DetailProductState) => state.rating,
	},
});
export const { setProduct, setAverageRating, setReviews } =
	detailProductSlice.actions;
