import { ProductListResponse } from '../../../utils/api/productsApi';
import { createAppAsyncThunk } from '../../hooks';
import { isLiked } from '../../../utils/product';
import { fetchDetailProduct } from '../detailProduct/thunk';

export const fetchProducts = createAppAsyncThunk<
	ProductListResponse,
	{ searchQuery?: string }
>(
	'products/fetchProducts',
	async function ({ searchQuery }, { extra: api, rejectWithValue }) {
		try {
			return await api.getProductsList(searchQuery);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchChangeLikeProduct = createAppAsyncThunk<
	IProduct,
	ProductLikeParam
>(
	'products/fetchChangeLikePost',
	async function (post, { dispatch, getState, extra: api }) {
		const { user } = getState();
		const liked = user.info ? isLiked(post.likes, user.info.id) : false;
		await api.changeLikeProductStatus(post.id, liked);
		const updateProduct = await dispatch(fetchDetailProduct(post.id)).unwrap();
		return updateProduct;
	}
);

export const fetchDeleteProduct = createAppAsyncThunk<IProduct, string>(
	'products/fetchDeleteProduct',
	async function (idProduct, { extra: api, rejectWithValue }) {
		try {
			return await api.deleteProductById(idProduct);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

console.dir(fetchProducts);
