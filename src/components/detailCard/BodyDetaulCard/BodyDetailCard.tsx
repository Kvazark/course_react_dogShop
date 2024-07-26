import s from './bodyDetailCard.Styled.module.scss';
import { SvgIcon } from '@mui/material';
import {
	FavoritesFillIcon,
	FavoritesIcon,
	QualityIcon,
	TruckIcon,
} from '../../../images';
import { BodyText, Button, Counter, HeaderText } from '../../ui';
import React, { useState } from 'react';
import { isLiked } from '../../../utils/product';
import { useActionCreators } from '../../../storage/hooks/useActionCreators';
import { productsActions } from '../../../storage/slices/products';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { userSelectors } from '../../../storage/slices/user';

type TBodyDetailCardProps = {
	product: IProduct;
};

export const BodyDetailCard = ({ product }: TBodyDetailCardProps) => {
	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);
	const [counter, setCounter] = useState(0);

	console.log(counter);
	const {
		fetchChangeLikeProduct,
		// fetchDeleteProduct
	} = useActionCreators(productsActions);
	const currentUser = useAppSelector(userSelectors.getUser);
	const like = isLiked(product.likes, currentUser?.id);

	return (
		<div className={s.cardWrapper}>
			<div className={s.cardWrapper_currentImg}>
				<div className={s.cardWrapper_labels}>
					{product.discount !== 0 && product.discount !== null && (
						<div className='label'>-{product.discount}%</div>
					)}
					{product.tags.length !== 0 && (
						<>
							{product.tags.map((item, index) => (
								<div className='label' key={`${index}-tag`}>
									{item}
								</div>
							))}
						</>
					)}
				</div>
				<img src={product.images} alt='img' />
			</div>
			<div className={s.cardWrapper_listImgs}>
				<div className={s.cardWrapper_listImgs_image}>
					{/*{product.images?.map((item, index) => (*/}
					{/*	<img src={item} alt='photo' key={`${index}-image`} />*/}
					{/*))}*/}
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
							product.likes &&
								fetchChangeLikeProduct({
									id: product.id,
									likes: product.likes,
								});
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
