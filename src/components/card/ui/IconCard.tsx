import {
	FavoritesFillIcon,
	FavoritesIcon,
	TrashIcon,
} from '../../../assets/images';
import { SvgIcon } from '@mui/material';
import '../cardStyled.scss';
import { isLiked } from '../../../utils/product';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { userSelectors } from '../../../storage/slices/user';
import { useSetLikeProductMutation } from '../../../api/products';

type TIconCard = {
	product: IProduct;
	variant: 'delete' | 'favorite';
};
export const IconCard = ({ product, variant }: TIconCard) => {
	const currentUser = useAppSelector(userSelectors.getUser);
	const [setLikeProductRequestFn] = useSetLikeProductMutation();
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
							setLikeProductRequestFn({ like, productId: product.id }).unwrap();
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
							setLikeProductRequestFn({ like, productId: product.id }).unwrap();
					}}
					className='card-wrapper_img-box_fav-icon'
				/>
			)}
		</>
	);
};
