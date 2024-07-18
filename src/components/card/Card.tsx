import './cardStyled.scss';
import { Button } from '../ui';
import { Link, useLocation } from 'react-router-dom';
import { IconCard } from './ui/IconCard';
import React from 'react';

type TCardProps = {
	product: IProduct;
	widthCard: number;
	variant?: 'fullInfo' | 'mainInfo';

	icon?: 'delete' | 'favorite';
};
export const Card = ({
	product,
	widthCard,
	variant = 'mainInfo',
	icon = 'favorite',
}: TCardProps) => {
	const currentPrice = Math.round(
		(product.price * (100 - product.discount)) / 100
	);

	const handleBtnClick = (
		event: React.MouseEvent<SVGSVGElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const location = useLocation();

	return (
		<Link
			to={`/product/${product.id}`}
			state={{ from: location }}
			key={`${product.id}-link`}
			className='card-wrapper link-reset'
			style={{
				width: `${widthCard}px`,
				justifyContent: variant === 'fullInfo' ? 'space-between' : '',
			}}>
			<div className='card-wrapper_img-box'>
				<div className='card-wrapper_img-box_labels'>
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
				<IconCard product={product} variant={icon} />
				<img src={product.images} alt='img' />
			</div>
			<div className='card-wrapper_description'>
				<div className='card-wrapper_description_price'>
					{product.discount !== 0 && product.discount !== null && (
						<span>{product.price} ₽</span>
					)}
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
			{variant === 'fullInfo' && (
				<Button
					label='В корзину'
					view='primary'
					onClick={() => handleBtnClick}
				/>
			)}
		</Link>
	);
};
