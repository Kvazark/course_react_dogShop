import { createAppAsyncThunk } from '../../hooks';
import {
	AddReview,
	AddReviewResponse,
	AverageRating,
} from '../../../utils/api/productsApi';

export const fetchDetailProduct = createAppAsyncThunk<IProduct, string>(
	'detail-product/fetchDetailProduct',
	async function (productId, { extra: api, rejectWithValue }) {
		try {
			return await api.getProductById(productId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchAverageRatingProduct = createAppAsyncThunk<
	AverageRating,
	string
>(
	'detail-product/fetchAverageRatingProduct',
	async function (productId, { extra: api, rejectWithValue }) {
		try {
			return await api.getAverageRatingProductById(productId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchAddReviewProductById = createAppAsyncThunk<
	AddReviewResponse,
	{ productId: string; review: AddReview }
>(
	'detail-product/fetchAddReviewProductById',
	async ({ productId, review }, { extra: api, rejectWithValue }) => {
		try {
			return await api.addReviewProductById(productId, review);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchReviewsProduct = createAppAsyncThunk<IReview[], string>(
	'detail-product/fetchReviewsProduct',
	async function (productId, { extra: api, rejectWithValue }) {
		try {
			return await api.getReviewsProductById(productId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
