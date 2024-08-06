import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
	products: IProduct[];
	length: number;
	searchFilter: ProductsSearchFilter;
}

const createInitialState = (): ProductsState => ({
	products: [],
	length: 0,
	searchFilter: {
		searchTerm: '',
		page: 1,
	},
});

const PRODUCT_SLICE_NAME = 'products';
export const productsSlice = createSlice({
	name: PRODUCT_SLICE_NAME,
	initialState: createInitialState(),
	reducers: {
		setSearchFilter(state, action: PayloadAction<ProductsSearchFilter>) {
			state.searchFilter = action.payload;
		},
		setProducts(
			state,
			action: PayloadAction<{ products: IProduct[]; length: number }>
		) {
			state.products = action.payload.products;
			state.length = action.payload.length;
		},
		updateProduct(state, action: PayloadAction<IProduct>) {
			state.products = state.products.map((product) =>
				product.id === action.payload.id ? action.payload : product
			);
		},
		deleteProduct(state, action: PayloadAction<string>) {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
			state.length -= 1;
		},
		changeLike(
			state,
			action: PayloadAction<{ productId: string; like: boolean }>
		) {
			state.products = state.products.map((product) =>
				product.id === action.payload.productId
					? { ...product, liked: action.payload.like }
					: product
			);
		},
	},
	selectors: {
		getProducts: (state: ProductsState) => state.products,
		getProductsCount: (state: ProductsState) => state.length,
		getSearchTerm: (state: ProductsState) => state.searchFilter.searchTerm,
		getSearchFilter: (state: ProductsState) => state.searchFilter,
	},
});

export const {
	setSearchFilter,
	setProducts,
	updateProduct,
	deleteProduct,
	changeLike,
} = productsSlice.actions;
