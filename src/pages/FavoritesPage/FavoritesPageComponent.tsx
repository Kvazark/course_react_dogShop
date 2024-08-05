import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { LeftArrowIcon } from '../../assets/images';
import './favoritesStyled.scss';
import { useCallback } from 'react';
import { Card } from '../../components/card';
import { SvgIcon } from '@mui/material';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { userSelectors } from '../../storage/slices/user';
import { productsSelectors } from '../../storage/slices/products';
import { withProtection } from '../../HOCs/withProtection';

export const FavoritesPageComponent = withProtection(() => {
	const location = useLocation();
	const navigate = useNavigate();

	const currentUser = useAppSelector(userSelectors.getUser);
	const products = useAppSelector(productsSelectors.getProducts);
	console.log(products);

	const userLikedProducts = useCallback(() => {
		return products.filter((product) =>
			product.likes.some((like) => like.userId === currentUser?.id)
		);
	}, [currentUser, products]);

	console.log(userLikedProducts(), userLikedProducts.length);
	const handleBackClick = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate('/');
		}
	};

	return (
		<div className='favorites-wrapper'>
			<div className='favorites-wrapper_header'>
				<Button
					label={<BodyText text='Назад' size='p2' />}
					view='link'
					contentLeft={
						<SvgIcon
							component={LeftArrowIcon}
							sx={{ width: '14px', height: '14px' }}
						/>
					}
					onClick={handleBackClick}
				/>
			</div>
			<div className='favorites-wrapper_content'>
				<HeaderText text='Избранное' size='h1' />
				<div className='favorites-wrapper_content_list'>
					{userLikedProducts.length > 0 ? (
						<>
							{userLikedProducts().map((item) => (
								<Card
									product={item}
									widthCard={236}
									variant='fullInfo'
									icon='delete'
									key={item.id}
								/>
							))}
						</>
					) : (
						<HeaderText text='Товары отсутствуют' size='h3' />
					)}
				</div>
			</div>
		</div>
	);
});
