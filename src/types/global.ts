export {};

declare global {
	type Token = {
		accessToken: string;
	};

	interface ProductsSearchFilter {
		searchTerm: string;
		page: number;
	}

	interface CartItem extends IProduct {
		count: number;
	}
}
