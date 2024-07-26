import { productsSlice } from './products-slice';
import {
	fetchChangeLikeProduct,
	fetchDeleteProduct,
	fetchProducts,
} from './thunk';

export const productsActions = {
	...productsSlice.actions,
	fetchProducts,
	fetchDeleteProduct,
	fetchChangeLikeProduct,
};
export const productsSelectors = productsSlice.selectors;
