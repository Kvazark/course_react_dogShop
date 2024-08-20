import {
	AppBar,
	Button,
	Menu,
	MenuItem,
	SvgIcon,
	useMediaQuery,
} from '@mui/material';
import { Logo } from '../logo';
import { Search } from '../search';
import {
	CartIcon,
	DogIcon,
	FavoritesIcon,
	MenuIcon,
} from '../../assets/images';
import React, { useState } from 'react';
import './headerStyled.scss';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { userSelectors } from '../../storage/slices/user';
import { BodyText } from '../ui';
import { cartSelectors } from '../../storage/slices/cart';

export const Header = () => {
	const accessToken = useAppSelector(userSelectors.accessTokenSelector);

	const isSmallScreen = useMediaQuery('(max-width:800px)');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	const location = useLocation();
	const currentUser = useAppSelector(userSelectors.getUser);
	const countFavorites = useAppSelector(userSelectors.getLikedProductsCount);
	const countCartProducts = useAppSelector(cartSelectors.getTotalCartItems);

	return (
		<AppBar
			position='static'
			elevation={0}
			sx={{
				height: '80px',
				backgroundColor: 'var(--main-color)',
			}}>
			<div className='toolbar'>
				<Logo />
				{accessToken ? (
					<>
						<Search />
						{isSmallScreen ? (
							<>
								<Button
									id='basic-button'
									aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
									onClick={handleClick}>
									<MenuIcon />
								</Button>
								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem onClick={handleClose}>My account</MenuItem>
								</Menu>
							</>
						) : (
							<div className='toolbar_icons'>
								<Link to={'/favoritesProducts'} state={{ from: location }}>
									<SvgIcon component={FavoritesIcon} inheritViewBox />
									{currentUser?.likes?.length &&
										currentUser?.likes?.length > 0 && (
											<div className='toolbar_icons_counter'>
												<BodyText
													text={countFavorites}
													size='s2'
													color='var(--white-color)'
												/>
											</div>
										)}
								</Link>
								<Link to={'/cart'}>
									<SvgIcon component={CartIcon} inheritViewBox />
									{countCartProducts > 0 && (
										<div className='toolbar_icons_counter'>
											<BodyText
												text={countCartProducts}
												size='s2'
												color='var(--white-color)'
											/>
										</div>
									)}
								</Link>
								<Link to={'/profile'}>
									<SvgIcon component={DogIcon} inheritViewBox />
								</Link>
							</div>
						)}
					</>
				) : (
					<div className='noAuth'>
						<Link to={'/signIn'}>
							<BodyText text='войти' size='p2' fontWeight='600' />
						</Link>
						<Link to={'/signUp'}>
							<BodyText text='зарегистрироваться' size='p2' fontWeight='600' />
						</Link>
					</div>
				)}
			</div>
		</AppBar>
	);
};
