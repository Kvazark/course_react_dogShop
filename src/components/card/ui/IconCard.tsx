import { FavoritesFillIcon, FavoritesIcon, TrashIcon } from '../../../images';
import { SvgIcon } from '@mui/material';
import React, { useContext } from 'react';
import '../cardStyled.scss';
import {
	ProductContext,
	ProductContextInterface,
} from '../../../context/product-context';
import { isLiked } from '../../../utils/product';
import { UserContext } from '../../../context/user-context';

type TIconCard = {
	product: IProduct;
	variant: 'delete' | 'favorite';
};
export const IconCard = ({ product, variant }: TIconCard) => {
	const { onProductLike } = useContext(
		ProductContext
	) as ProductContextInterface;

	const currentUser = useContext(UserContext);
	const like = isLiked(product.likes, currentUser?.id);

	return (
		<>
			{variant === 'favorite' ? (
				<SvgIcon
					component={like ? FavoritesFillIcon : FavoritesIcon}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						product.likes &&
							onProductLike({ id: product.id, likes: product.likes });
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			) : (
				<SvgIcon
					component={TrashIcon}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						product.likes &&
							onProductLike({ id: product.id, likes: product.likes });
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			)}
		</>
	);
};
