import {
	fetchAddReviewProductById,
	fetchAverageRatingProduct,
	fetchDetailProduct,
	fetchReviewsProduct,
} from './thunk';
import { detailProductSlice } from './detail-product-slice';

export const detailProductActions = {
	...detailProductSlice.actions,
	fetchDetailProduct,
	fetchAverageRatingProduct,
	fetchReviewsProduct,
	fetchAddReviewProductById,
};
export const detailProductSelectors = detailProductSlice.selectors;
