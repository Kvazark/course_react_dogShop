import './cardStyled.scss';
import { BodyText, Button, Counter } from '../ui';
import { Link, useLocation } from 'react-router-dom';
import { IconCard } from './ui/IconCard';
import React, { useEffect, useRef, useState } from 'react';
import { useGetProductQuery } from '../../api/products';
import { Spinner } from '../spinner';
import { ErrorPage } from '../../pages/ErrorPage';
import { useAppDispatch } from '../../storage/hooks';
import { cartActions, cartSelectors } from '../../storage/slices/cart';
import { useAppSelector } from '../../storage/hooks/useAppSelector';

type TCardProps = {
	product: IProduct | IProductInReview;
	widthCard: number;
	variant?: 'fullInfo' | 'mainInfo';

	icon?: 'delete' | 'favorite';

	showTags?: boolean;
};
export const Card = ({
	product,
	widthCard,
	variant = 'mainInfo',
	icon = 'favorite',
	showTags = false,
}: TCardProps) => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [isCounter, setIsCounter] = useState(false);
	const [counter, setCounter] = useState<number>(0);

	const prevCounterRef = useRef(counter);

	const {
		data: productLocal,
		isLoading,
		isError,
		error,
	} = useGetProductQuery(product?.id);

	const cartItemCount = useAppSelector((state) =>
		cartSelectors.getCartItemCount(state, product.id)
	);

	useEffect(() => {
		if (counter === 0) setIsCounter(false);
		if (productLocal) {
			if (counter > prevCounterRef.current) {
				dispatch(
					cartActions.addToCart({
						product: productLocal,
					})
				);
				prevCounterRef.current += counter - prevCounterRef.current;
			} else if (counter < prevCounterRef.current) {
				dispatch(
					cartActions.updateQuantity({
						id: productLocal.id,
						count: cartItemCount - 1,
					})
				);
				if (counter === 0 && cartItemCount === 1)
					dispatch(cartActions.removeFromCart(productLocal.id));
				prevCounterRef.current -= prevCounterRef.current - counter;
			}
		}
	}, [counter]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		console.error('Ошибка при получении данных о товаре:', error);
		return <ErrorPage />;
	}

	if (!productLocal) {
		return null;
	}

	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);

	const handleBtnClick = () => {
		setIsCounter(true);
		setCounter(1);
	};

	const isAddToCartDisabled =
		product.stock <= 0 ||
		(cartItemCount && cartItemCount >= product.stock) ||
		cartItemCount + counter >= product.stock;

	return (
		<div className='card-wrapper link-reset'>
			<Link
				to={`/product/${product.id}`}
				state={{ from: location }}
				className='card-wrapper link-reset'
				style={{
					width: `${widthCard}px`,
					justifyContent: variant === 'fullInfo' ? 'space-between' : '',
				}}>
				<div className='card-wrapper_img-box'>
					<div className='card-wrapper_img-box_labels'>
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
						{product.tags.length !== 0 && showTags && (
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
					<IconCard product={productLocal as IProduct} variant={icon} />
					<img src={product.images} alt='img' />
				</div>
				<div className='card-wrapper_description'>
					<div className='card-wrapper_description_price'>
						{!!product && <span>{product.price} ₽</span>}
						<p
							style={{
								color:
									product.discount !== 0
										? 'var(--custom-red)'
										: 'var(--text-main)',
							}}>
							{currentPrice}₽
						</p>
					</div>
					<div className='card-wrapper_description_name'>
						<span>{product.stock} г</span>
						<p>{product.name}</p>
					</div>
				</div>
			</Link>
			{variant === 'fullInfo' && (
				<>
					{isCounter ? (
						<Counter
							initialValue={counter}
							minValue={0}
							maxValue={product.stock || product.stock - cartItemCount}
							onGetCounter={setCounter}
						/>
					) : (
						<Button
							label='В корзину'
							view='primary'
							onClick={() => handleBtnClick()}
							disabled={isAddToCartDisabled || false}
						/>
					)}
				</>
			)}
		</div>
	);
};
