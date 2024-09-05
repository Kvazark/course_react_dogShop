import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { LeftArrowIcon } from '../../assets/images';
import './favoritesStyled.scss';
import { Card } from '../../components/card';
import { SvgIcon } from '@mui/material';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { withProtection } from '../../HOCs/withProtection';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../storage/hooks';
import { userSelectors } from '../../storage/slices/user';

export const FavoritesPage = withProtection(() => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const currentUser = useAppSelector(userSelectors.getUser);
	const [likedProducts, setLikeProducts] = useState<ILikesByUser[] | undefined>(
		[]
	);

	useEffect(() => {
		setLikeProducts(currentUser?.likes || []);
	}, [currentUser?.likes, dispatch, location, currentUser]);

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
					{likedProducts ? (
						<>
							{likedProducts.map((item) => (
								<Card
									product={item.product}
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
