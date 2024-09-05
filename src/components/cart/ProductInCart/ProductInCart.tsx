import s from './productInCartStyled.module.scss';
import { BodyText, Counter, HeaderText } from '../../ui';
import React, { useEffect, useState } from 'react';
import { SvgIcon } from '@mui/material';
import { TrashIcon } from '../../../assets/images';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { cartActions, cartSelectors } from '../../../storage/slices/cart';
import { useAppDispatch } from '../../../storage/hooks';

type TProductInCartProps = {
	product: IProduct;
};

export const ProductInCart = ({ product }: TProductInCartProps) => {
	const dispatch = useAppDispatch();
	const cartItemCount = useAppSelector((state) =>
		cartSelectors.getCartItemCount(state, product.id)
	);

	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);
	const [counter, setCounter] = useState(cartItemCount);

	useEffect(() => {
		dispatch(
			cartActions.updateQuantity({
				id: product.id,
				count: counter,
			})
		);
	}, [counter, dispatch, product.id]);
	const handleDeleteClick = () => {
		dispatch(cartActions.removeFromCart(product.id));
	};

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_infoBlock}>
				<div className={s.wrapper_infoBlock_photo}>
					<img src={product.images} alt='img' />
				</div>
				<div className={s.wrapper_infoBlock_info}>
					<BodyText text={product.name} size='p2' fontWeight='700' />
					<BodyText text={product.stock} size='s1' />
				</div>
			</div>
			<div className={s.wrapper_rightSide}>
				<Counter
					initialValue={counter}
					minValue={1}
					maxValue={product.stock}
					onGetCounter={setCounter}
				/>
				<div className={s.wrapper_rightSide_price}>
					{product.discount !== 0 && product.discount !== null && (
						<span>{counter * product.price} ₽</span>
					)}
					<HeaderText
						text={`${counter * currentPrice}₽`}
						color={
							product.discount !== 0 ? 'var(--custom-red)' : 'var(--text-main)'
						}
					/>
				</div>
				<SvgIcon component={TrashIcon} onClick={handleDeleteClick} />
			</div>
		</div>
	);
};
