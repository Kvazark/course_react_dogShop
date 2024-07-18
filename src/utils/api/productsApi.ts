type ConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

type UserUpdateDto = Partial<
	Omit<IUserBase, 'likesProducts' | 'id'> & { password: string }
>;

type ProductListResponse = {
	products: IProduct[];
	length: number;
};

type ProductLikeResponse = {
	like: ILikeBase;
	message: string;
};

type AvarageRating = {
	rating: number;
};

// type ProductCreateDto = Pick<
// 	IProduct,
// 	'name' | 'description' | 'stock' | 'price' | 'tags'
// >;

export class Api {
	private baseUrl;
	private headers;

	constructor({ baseUrl, headers }: ConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	private async onResponse<T>(res: Response): Promise<T> {
		return res.ok
			? res.json()
			: res.json().then((data) => Promise.reject(data));
	}

	private async request<T>(
		endpoint: string,
		options?: RequestInit
	): Promise<T> {
		const res = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'GET',
			...options,
			headers: { ...this.headers, ...options?.headers },
		});
		return await this.onResponse<T>(res);
	}

	// async getAllInfo(): Promise<[ProductListResponse, IUserBase]> {
	// 	return await Promise.all([this.getProductsList(), this.getUserInfo()]);
	// }
	//
	// async getProductsList(searchQuery = '') {
	// 	return await this.request<ProductListResponse>(
	// 		`/products?searchTerm=${searchQuery}`
	// 	);
	// }

	async getAllInfo(
		searchQuery = ''
	): Promise<[ProductListResponse, IUserBase]> {
		const [productData, userData] = await Promise.all([
			this.getProductsList(searchQuery),
			this.getUserInfo(),
		]);
		return [productData, userData];
	}

	async getProductsList(searchQuery = ''): Promise<ProductListResponse> {
		const url = `/products?searchTerm=${encodeURIComponent(searchQuery)}`;
		return await this.request<ProductListResponse>(url);
	}

	async getProductById(productID: string) {
		return await this.request<IProduct>(`/products/${productID}`);
	}

	async changeLikeProductStatus(productID: string, like: boolean) {
		return await this.request<ProductLikeResponse>(
			`/products/${productID}/likes`,
			{
				method: like ? 'DELETE' : 'PUT',
			}
		);
	}

	async getReviewsProductById(productID: string) {
		return await this.request<IReview[]>(`/reviews/${productID}`);
	}

	async getAverageRatingProductById(productID: string) {
		return await this.request<AvarageRating>(
			`/reviews/average-by-product/${productID}`
		);
	}

	async getUserInfo() {
		return await this.request<IUserBase>('/users/me');
	}

	// async addProduct(productData: ProductCreateDto) {
	// 	return await this.request<IProduct>('/products', {
	// 		method: 'POST',
	// 		body: JSON.stringify(productData),
	// 	});
	// }

	async setUserInfo(userData: UserUpdateDto) {
		return await this.request<IUserBase>('/users/me/', {
			method: 'PATCH',
			body: JSON.stringify(userData),
		});
	}
}

const config = {
	apiUrl: 'https://api.v2.react-learning.ru',
	apiToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdWd0bjNxbzAwMDBxaXJibXJydThocnQiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzIxMDQ1ODc4LCJleHAiOjE3MjEwNDY0Nzh9.eiY7V31nP_vpzlBg2oo-Erhhf3j4ciDlDu8aK57RKpU',
};

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		Authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;
