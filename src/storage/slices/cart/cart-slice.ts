import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAddToCartPayload {
	product: IProduct;
	transmittedCount?: number;
}

interface CartState {
	count: number;
	products: CartItem[];
}

const createInitState = (): CartState => ({
	count: 0,
	products: [],
});

const CART_SLICE_NAME = 'cart';
export const cartSlice = createSlice({
	name: CART_SLICE_NAME,
	initialState: createInitState(),
	reducers: {
		addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
			// Нельзя добавить товар, если stock равен нулю
			if (action.payload.product.stock <= 0) {
				return;
			}
			const existingItem = state.products.find(
				(item) => item.id === action.payload.product.id
			);

			if (existingItem) {
				// Нельзя добавить больше товаров, чем есть на складе
				const totalNewCount = action.payload.transmittedCount
					? existingItem.count + action.payload.transmittedCount
					: existingItem.count + 1;

				// Нельзя добавить больше товаров, чем есть на складе
				if (totalNewCount <= action.payload.product.stock) {
					existingItem.count = totalNewCount;
				} else {
					existingItem.count = action.payload.product.stock;
				}
			} else {
				let initialCount = 1;
				if (action.payload.transmittedCount)
					initialCount =
						action.payload.transmittedCount <= action.payload.product.stock
							? action.payload.transmittedCount
							: action.payload.product.stock;
				state.products.push({ ...action.payload.product, count: initialCount });
			}
			state.count = state.products.reduce((sum, item) => sum + item.count, 0);
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter(
				(item) => item.id !== action.payload
			);
			state.count = state.products.reduce((sum, item) => sum + item.count, 0);
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: string; count: number }>
		) => {
			const { id, count } = action.payload;
			const item = state.products.find((i) => i.id === id);

			if (item) {
				item.count = Math.max(1, Math.min(count, item.stock));
			}
			state.count = state.products.reduce((sum, item) => sum + item.count, 0);
		},
	},
	selectors: {
		getCartItems: (state: CartState) => state.products,
		getCartItemCount: (state: CartState, productId: string) =>
			state.products.find((item) => item.id === productId)?.count || 0,
		getTotalCartItems: (state: CartState) =>
			state.products.reduce((total, item) => total + item.count, 0),
	},
});
