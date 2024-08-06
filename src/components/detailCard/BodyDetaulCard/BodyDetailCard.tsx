import s from './bodyDetailCard.Styled.module.scss';
import { SvgIcon } from '@mui/material';
import {
	FavoritesFillIcon,
	FavoritesIcon,
	QualityIcon,
	TruckIcon,
} from '../../../assets/images';
import { BodyText, Button, Counter, HeaderText } from '../../ui';
import React, { useState } from 'react';
import { isLiked } from '../../../utils/product';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { userSelectors } from '../../../storage/slices/user';
import {
	useGetProductQuery,
	useSetLikeProductMutation,
} from '../../../api/products';
import { changeLike } from '../../../storage/slices/products/products-slice';
import { useAppDispatch } from '../../../storage/hooks';

type TBodyDetailCardProps = {
	productProps: IProduct;
};

export const BodyDetailCard = ({ productProps }: TBodyDetailCardProps) => {
	const dispatch = useAppDispatch();
	const { data: product, refetch } = useGetProductQuery(productProps.id);
	const currentUser = useAppSelector(userSelectors.getUser);
	const [setLikeProductRequestFn] = useSetLikeProductMutation();

	///на будущее для корзины сделала, потому что компонент Counter принимает пропс колбэк onGetCounter
	const [counter, setCounter] = useState(0);
	///eslint ругается на неиспользование переменной counter. До 6 дз сделала временно так
	console.log(counter);

	if (!product) {
		return null;
	}

	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);

	const like = isLiked(product.likes, currentUser?.id);
	const handleLikeClick = async () => {
		try {
			await setLikeProductRequestFn({ like, productId: product?.id }).unwrap();
			await refetch();
			dispatch(changeLike({ productId: product?.id, like: !like }));
		} catch (error) {
			alert(`Ошибка при изменении лайка: ${error}`);
		}
	};

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
					<Counter onGetCounter={setCounter} />
					<Button label='В корзину' view='primary' stretch />
				</div>
				<div className={s.cardWrapper_description_favorite}>
					<SvgIcon
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
					/>
					<BodyText
						text={like ? 'Убрать из избранного' : 'В избранное'}
						size='s1'
						color='var(--text-secondary)'
					/>
				</div>
				<div className={s.cardWrapper_description_placeholders}>
					<div className={s.placeholdersWrapper}>
						<div className={s.placeholdersWrapper_icons}>
							<SvgIcon component={TruckIcon} sx={{ width: '32px' }} />
						</div>
						<div className={s.placeholdersWrapper_description}>
							<BodyText
								text='Доставка по всему Миру!'
								size='p1'
								fontWeight='700'
							/>
							<div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
								<BodyText text='Доставка курьером —' size='p2' />
								<BodyText text={'от 399 ₽'} size='p2' fontWeight='700' />
							</div>
							<div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
								<BodyText text='Доставка в пункт выдачи —' size='p2' />
								<BodyText text='от 199 ₽' size='p2' fontWeight='700' />
							</div>
						</div>
					</div>
					<div className={s.placeholdersWrapper}>
						<div className={s.placeholdersWrapper_icons}>
							<SvgIcon component={QualityIcon} sx={{ height: '40px' }} />
						</div>
						<div className={s.placeholdersWrapper_description}>
							<BodyText text='Гарантия качества' size='p1' fontWeight='700' />
							<BodyText
								text='Если Вам не понравилось качество нашей продукции,
							мы вернем деньги, либо сделаем все возможное,
							чтобы удовлетворить ваши нужды.'
								size='p2'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
