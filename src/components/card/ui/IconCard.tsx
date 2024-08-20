import {
	FavoritesFillIcon,
	FavoritesIcon,
	TrashIcon,
} from '../../../assets/images';
import { SvgIcon } from '@mui/material';
import '../cardStyled.scss';
import { isLiked } from '../../../utils/product';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { userActions, userSelectors } from '../../../storage/slices/user';
import {
	useGetProductQuery,
	useSetLikeProductMutation,
} from '../../../api/products';
import {
	changeLike,
	updateProduct,
} from '../../../storage/slices/products/products-slice';
import { useAppDispatch } from '../../../storage/hooks';
import { useGetUserQuery } from '../../../api/user';
import { useEffect } from 'react';

type TIconCard = {
	product: IProduct;
	variant: 'delete' | 'favorite';
};
export const IconCard = ({ product, variant }: TIconCard) => {
	const dispatch = useAppDispatch();
	const { data: productLocal, refetch } = useGetProductQuery(product?.id);
	const { data: currentUser, refetch: refetchUser } = useGetUserQuery();

	const [setLikeProductRequestFn] = useSetLikeProductMutation();
	const like = isLiked(product.likes, currentUser?.id);
	const countFavorites = useAppSelector(userSelectors.getLikedProductsCount);

	const handleLikeClick = async () => {
		try {
			await setLikeProductRequestFn({
				like: like,
				productId: product?.id,
			}).unwrap();
			await refetch();
			await refetchUser();

			if (productLocal) await dispatch(updateProduct(productLocal));

			const newLikesCount = !like ? countFavorites + 1 : countFavorites - 1;
			dispatch(userActions.updateLikesCount(newLikesCount));
			dispatch(changeLike({ productId: product?.id, like: !like }));
		} catch (error) {
			alert(`Ошибка при изменении лайка: ${error}`);
		}
	};

	useEffect(() => {
		refetchUser();
	}, [dispatch, refetchUser]);

	return (
		<>
			{variant === 'favorite' ? (
				<SvgIcon
					component={like ? FavoritesFillIcon : FavoritesIcon}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						product.likes && handleLikeClick();
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			) : (
				<SvgIcon
					component={TrashIcon}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						product.likes && handleLikeClick();
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			)}
		</>
	);
};
