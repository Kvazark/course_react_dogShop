import s from './cardCartStyled.module.scss';
import { BodyText, Button, HeaderText } from '../../ui';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { cartSelectors } from '../../../storage/slices/cart';
import { useMemo } from 'react';

type TCardCartProps = {
	products: IProduct[];
};
export const CardCart = ({ products }: TCardCartProps) => {
	const count = useAppSelector(cartSelectors.getTotalCartItems);

	const productCounts = useAppSelector((state) =>
		products.map((product) => cartSelectors.getCartItemCount(state, product.id))
	);

	const { totalPrice, finishPrice } = useMemo(() => {
		return products.reduce(
			(acc, product, index) => {
				const countCurrentProduct = productCounts[index];
				const originalPrice = product.price * countCurrentProduct;
				const discountedPrice =
					((product.price * (100 - product.discount)) / 100) *
					countCurrentProduct;

				acc.totalPrice += originalPrice;
				acc.finishPrice += discountedPrice;

				return acc;
			},
			{ totalPrice: 0, finishPrice: 0 }
		);
	}, [productCounts, products]);

	return (
		<div className={s.wrapper}>
			<HeaderText text='Ваша корзина' size='h3' />
			<div className={s.wrapper_info}>
				<div className={s.wrapper_info_block}>
					<BodyText
						text={`Товары (${count})`}
						size='p2'
						color='var(--text-secondary)'
					/>
					<BodyText text={`${totalPrice}₽`} size='p2' fontWeight='600' />
				</div>
				<div className={s.wrapper_info_block}>
					<BodyText text='Скидка' size='p2' color='var(--text-secondary)' />
					<BodyText
						text={`- ${totalPrice - finishPrice}₽`}
						size='p2'
						fontWeight='600'
						color='var(--custom-red)'
					/>
				</div>
				<div className='separator' />
				<div className={s.wrapper_info_block}>
					<BodyText text='Общая стоимость' size='p2' fontWeight='800' />
					<HeaderText text={`${finishPrice}₽`} size='h3' />
				</div>
			</div>
			<Button label='Оформить заказ' view='primary' />
		</div>
	);
};
