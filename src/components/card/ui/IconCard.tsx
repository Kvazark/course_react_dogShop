import { FavoritesFillIcon, FavoritesIcon, TrashIcon } from '../../../images';
import { SvgIcon } from '@mui/material';
import '../cardStyled.scss';
import { isLiked } from '../../../utils/product';
import { useActionCreators } from '../../../storage/hooks/useActionCreators';
import { productsActions } from '../../../storage/slices/products';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { userSelectors } from '../../../storage/slices/user';

type TIconCard = {
	product: IProduct;
	variant: 'delete' | 'favorite';
};
export const IconCard = ({ product, variant }: TIconCard) => {
	const { fetchChangeLikeProduct } = useActionCreators(productsActions);
	const currentUser = useAppSelector(userSelectors.getUser);
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
							fetchChangeLikeProduct({ id: product.id, likes: product.likes });
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
							fetchChangeLikeProduct({ id: product.id, likes: product.likes });
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			)}
		</>
	);
};
