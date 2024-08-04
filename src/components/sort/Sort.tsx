import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { BodyText } from '../ui';
import './sortStyled.scss';
import { TrianglesIcon } from '../../assets/images';
import React, { useState } from 'react';

export const Sort = () => {
	const isSmallScreen = useMediaQuery('(max-width:900px)');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className='sort-wrapper'>
			{isSmallScreen && (
				<div className='sort-wrapper_menu'>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}>
						<TrianglesIcon />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
					</Menu>
				</div>
			)}
			<BodyText text='Популярное' size='p2' />
			<div className='sort-wrapper_list'>
				<BodyText text='Новинки' size='p2' />
				<BodyText text='Сначала дешёвые' size='p2' />
				<BodyText text='Сначала дорогие' size='p2' />
				<BodyText text='По рейтингу' size='p2' />
				<BodyText text='По скидке' size='p2' />
			</div>
		</div>
	);
};
