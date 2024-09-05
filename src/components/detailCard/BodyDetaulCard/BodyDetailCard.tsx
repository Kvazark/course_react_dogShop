import s from './bodyDetailCard.Styled.module.scss';
import { SvgIcon } from '@mui/material';
import { FavoritesFillIcon, FavoritesIcon } from '../../../assets/images';
import {
	BodyText,
	Button,
	Counter,
	HeaderText,
	PlaceholderCard,
} from '../../ui';
import { useState } from 'react';
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
import { cartActions, cartSelectors } from '../../../storage/slices/cart';

type TBodyDetailCardProps = {
	productProps: IProduct;
};

export const BodyDetailCard = ({ productProps }: TBodyDetailCardProps) => {
	const dispatch = useAppDispatch();
	const { data: product, refetch } = useGetProductQuery(productProps.id);
	const { data: currentUser, refetch: refetchUser } = useGetUserQuery();
	const [setLikeProductRequestFn] = useSetLikeProductMutation();

	const countFavorites = useAppSelector(userSelectors.getLikedProductsCount);
	const cartItemCount = useAppSelector((state) =>
		cartSelectors.getCartItemCount(state, productProps.id)
	);

	const [counter, setCounter] = useState(0);

	if (!product) {
		return null;
	}

	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);

	const like = isLiked(product.likes, currentUser?.id);

	const handleLikeClick = async () => {
		try {
			await setLikeProductRequestFn({
				like: like,
				productId: product?.id,
			}).unwrap();
			await refetch();
			await refetchUser();

			await dispatch(updateProduct(product));

			const newLikesCount = !like ? countFavorites + 1 : countFavorites - 1;
			dispatch(userActions.updateLikesCount(newLikesCount));
			dispatch(changeLike({ productId: product?.id, like: !like }));
		} catch (error) {
			alert(`Ошибка при изменении лайка: ${error}`);
		}
	};

	console.log(product.stock);

	const handleBtnAddCartClick = () => {
		if (counter > 0) {
			const productToAdd = {
				product: { ...product },
				transmittedCount: counter,
			};
			dispatch(cartActions.addToCart(productToAdd));
		}
	};

	const isAddToCartDisabled =
		product.stock <= 0 ||
		(cartItemCount && cartItemCount >= product.stock) ||
		counter === 0 ||
		cartItemCount + counter >= product.stock;

	return (
		<div className={s.cardWrapper}>
			<div className={s.cardWrapper_currentImg}>
				<div className={s.cardWrapper_labels}>
					{product.discount !== 0 && product.discount !== null && (
						<div className='label'>
							<BodyText
								text={`-${product.discount}%`}
								size='p1'
								fontWeight='800'
								color='var(--white-color)'
							/>
						</div>
					)}
					{product.tags.length !== 0 && (
						<>
							{product.tags.map((item, index) => (
								<div className='label' key={`${index}-tag`}>
									<BodyText
										text={item}
										size='p1'
										fontWeight='800'
										color='var(--white-color)'
									/>
								</div>
							))}
						</>
					)}
				</div>
				<img src={product.images} alt='img' />
			</div>
			<div className={s.cardWrapper_listImgs}>
				<div className={s.cardWrapper_listImgs_image}>
					<img src={product.images} alt='img' />
				</div>
			</div>
			<div className={s.cardWrapper_description}>
				<div className='card-wrapper_description_price' style={{}}>
					{product.discount !== 0 && product.discount !== null && (
						<span>{product.price} ₽</span>
					)}
					<HeaderText
						text={`${currentPrice}₽`}
						size='h1'
						color={
							product.discount !== 0 ? 'var(--custom-red)' : 'var(--text-main)'
						}
					/>
				</div>
				<div className={s.cardWrapper_description_btns}>
					<Counter maxValue={product.stock} onGetCounter={setCounter} />
					<Button
						label='В корзину'
						view='primary'
						stretch
						onClick={handleBtnAddCartClick}
						disabled={isAddToCartDisabled || false}
					/>
				</div>
				<div className={s.cardWrapper_description_favorite}>
					<SvgIcon
						data-testid='like-btn'
						component={like ? FavoritesFillIcon : FavoritesIcon}
						sx={{
							path: {
								fill: like ? '' : 'var(--text-secondary)',
							},
						}}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							product.likes && handleLikeClick();
						}}
						className={`${like ? 'liked' : 'not-liked'}`}
					/>
					<BodyText
						text={like ? 'Убрать из избранного' : 'В избранное'}
						size='s1'
						color='var(--text-secondary)'
					/>
				</div>
				<div className={s.cardWrapper_description_placeholders}>
					<PlaceholderCard view='delivery' />
					<PlaceholderCard view='quality' />
				</div>
			</div>
		</div>
	);
};
