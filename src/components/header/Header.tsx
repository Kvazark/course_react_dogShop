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
import { CartIcon, DogIcon, FavoritesIcon, MenuIcon } from '../../images';
import React, { useState } from 'react';
import './headerStyled.scss';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
	const isSmallScreen = useMediaQuery('(max-width:800px)');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	const location = useLocation();

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
						</Link>
						<Link to={'/'}>
							<SvgIcon component={CartIcon} inheritViewBox />
						</Link>
						<Link to={'/profile'}>
							<SvgIcon component={DogIcon} inheritViewBox />
						</Link>
					</div>
				)}
			</div>
		</AppBar>
	);
};
