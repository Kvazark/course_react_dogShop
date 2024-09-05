export const isLiked = (
	likes: ILikesInProduct[],
	userId: string | undefined
) => {
	if (!userId || !likes || likes.length === 0) {
		return false;
	}

	return likes.some((like) => like.userId === userId);
};
