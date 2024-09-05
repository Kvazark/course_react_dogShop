export {};

declare global {
	interface IProduct extends IProductBase {
		likes: ILikesInProduct[];
		category: ICategory;
		reviews: IReview[];
		user: IUserWithLikes;
	}

	interface ILikesInProduct extends ILikeBase {
		user: IUser;
	}

	interface ILikesByUser extends ILikeBase {
		product: IProductInReview;
	}

	interface ILikeBase {
		id: string;
		userId: string;
		productId: string;
	}

	interface IUserWithLikes extends IUserBase {
		likes: ILikesByUser[];
		favoritesPost: IFavoritesPost[];
	}

	interface IUser extends IUserBase {
		password: string;
		createdAt: string;
		updatedAt: string;
		provider: null | string;
		isAdmin: boolean;
		isBlocked: boolean;
	}

	interface IUserBase {
		id: string;
		email: string;
		name: string;
		avatarPath: string;
		about: string;
		phone: string;
		roles: string[];
	}

	interface ICategory {
		id: number;
		name: string;
		slug: string;
	}

	interface IReview {
		user: IUserWithLikes;
		createdAt: string;
		text: string;
		rating: number;
		id: string;
		product: IProductInReview;
	}

	interface IFavoritesPost {
		id: string;
		userId: string;
		postId: string;
		post: IPost;
	}

	interface IPost extends ICommonProperties {
		updatedAt: string;
		body: string;
		title: string;
		favoritesCount: number;
		userId: string;
	}

	interface IProductInReview extends IProductBase {
		updatedAt: string;
		wight: string | null;
		categoryId: number;
		userId: string;
	}

	interface IProductBase extends ICommonProperties {
		name: string;
		price: number;
		discount: number;
		stock: number;
	}

	interface ICommonProperties {
		id: string;
		createdAt: string;
		slug: string;
		description: string;
		images: string;
		tags: string[];
		isPublished: true;
	}

	type ProductLikeParam = {
		id: string;
		likes: ILikesInProduct[];
	};
}
