import s from './cartStyled.module.scss';
import { withProtection } from '../../HOCs/withProtection';
import { CardCart, ProductInCart } from '../../components/cart';
import {
	BodyText,
	Button,
	Carousel,
	HeaderText,
	PlaceholderCard,
} from '../../components/ui';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import React from 'react';
import { cartSelectors } from '../../storage/slices/cart';
import { declensionWords } from '../../utils';
import { SvgIcon } from '@mui/material';
import { NotFoundIcon } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

export const Cart = withProtection(() => {
	const navigate = useNavigate();
	const cartProducts = useAppSelector(cartSelectors.getCartItems);
	const totalCount = useAppSelector(cartSelectors.getTotalCartItems);

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<HeaderText
					text={`${declensionWords(totalCount, [
						'товар',
						'товара',
						'товаров',
					])}`}
					size='h1'
				/>
				<span>в корзине</span>
			</div>
			{!!cartProducts.length ? (
				<>
					<div className={s.wrapper_content}>
						<div className={s.wrapper_products}>
							{cartProducts.map((item, index) => (
								<ProductInCart product={item} key={`${index}-cart-product`} />
							))}
						</div>
						<div className={s.wrapper_infoCart}>
							<CardCart products={cartProducts} />
							<PlaceholderCard view='delivery' />
						</div>
					</div>
					<Carousel title='С этим товаром заказывают' />
				</>
			) : (
				<div className='errorPage-wrapper'>
					<div className='icon'>
						<SvgIcon component={NotFoundIcon} />
					</div>
					<BodyText text='В корзине нет товаров' size='p1' fontWeight='700' />
					<BodyText
						text='Добавьте товар, нажав кнопку «В корзину» в карточке товара'
						size='p2'
						color='var(--text-secondary)'
					/>
					<Button
						label='На главную'
						view='outlined'
						onClick={() => navigate('/')}
					/>
				</div>
			)}
		</div>
	);
});
