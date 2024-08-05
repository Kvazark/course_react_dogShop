export interface IAverageRating {
	rating: number;
}

export interface IAddReview {
	rating: number;
	text: string;
}

export interface IAddReviewResponse {
	message: string;
}

export interface IProductListResponse {
	products: IProduct[];
	length: number;
}

export interface IProductLikeResponse {
	like: ILikeBase;
	message: string;
}

export interface IProductLikeDto {
	productId: string;
	like: boolean;
}
