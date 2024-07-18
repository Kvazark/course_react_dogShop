import { useLocation, useNavigate } from 'react-router-dom';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { LeftArrowIcon } from '../../images';
import './favoritesStyled.scss';
import { useCallback, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import {
	ProductContext,
	ProductContextInterface,
} from '../../context/product-context';
import { Card } from '../../components/card';
import { SvgIcon } from '@mui/material';

export const FavoritesPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const currentUser = useContext(UserContext);
	const { products } = useContext(ProductContext) as ProductContextInterface;

	// const [favoritesProducts, setFavoritesProducts] = useState<IProduct[]>([]);
	const userLikedProducts = useCallback(() => {
		return products.filter((product) =>
			product.likes.some((like) => like.userId === currentUser?.id)
		);
	}, [currentUser, products]);

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
					{userLikedProducts().map((item) => (
						<Card
							product={item}
							widthCard={236}
							variant='fullInfo'
							icon='delete'
							key={item.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
