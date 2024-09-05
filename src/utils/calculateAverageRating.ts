export const calculateAverageRating = (product: IProduct | null) => {
	if (!product?.reviews || product?.reviews.length === 0) {
		return 0;
	}

	const totalRating = product?.reviews.reduce(
		(sum, review) => sum + review.rating,
		0
	);
	return totalRating / product.reviews.length;
};
