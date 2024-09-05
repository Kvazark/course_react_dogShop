export const sortByNewest = (products: IProduct[]) => {
	return [...products].sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB.getTime() - dateA.getTime();
	});
};

export const sortByPriceLowToHigh = (products: IProduct[]) => {
	return [...products].sort((a, b) => a.price - b.price);
};

export const sortByPriceHighToLow = (products: IProduct[]) => {
	return [...products].sort((a, b) => b.price - a.price);
};

export const sortByDiscount = (products: IProduct[]) => {
	return [...products].sort((a, b) => b.discount - a.discount);
};

export const sortByPopular = (products: IProduct[]) => {
	return [...products].sort((a, b) => b.reviews.length - a.reviews.length);
};
