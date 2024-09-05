import { Box, Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { BodyText } from '../ui';
import './sortStyled.scss';
import { TrianglesIcon } from '../../assets/images';
import React, { useMemo, useState } from 'react';

export type TSortOption =
	| 'newest'
	| 'price-low-to-high'
	| 'price-high-to-low'
	| 'rating'
	| 'discount'
	| 'popular';

const sortedList = [
	{
		title: 'Популярное',
		sortName: 'popular',
	},
	{
		title: 'Новинки',
		sortName: 'newest',
		onClick: 'handleSortByPopular',
	},
	{
		title: 'Сначала дешёвые',
		sortName: 'price-low-to-high',
		onClick: 'handleSortByPopular',
	},
	{
		title: 'Сначала дорогие',
		sortName: 'price-high-to-low',
		onClick: 'handleSortByPopular',
	},
	{
		title: 'По рейтингу',
		sortName: 'rating',
		onClick: 'handleSortByPopular',
	},
	{
		title: 'По скидке',
		sortName: 'discount',
		onClick: 'handleSortByPopular',
	},
];

type TSortProps = {
	onSortChange: (sort: TSortOption) => void;
	currentSort: TSortOption;
};

export const Sort = ({ onSortChange, currentSort }: TSortProps) => {
	const isSmallScreen = useMediaQuery('(max-width:900px)');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const sortTitle = useMemo(() => {
		const sortOption = sortedList.find((item) => item.sortName === currentSort);
		return sortOption ? sortOption.title : '';
	}, [currentSort]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSort = (sortName: TSortOption) => {
		onSortChange(sortName);
		handleClose();
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
					<BodyText text={`${sortTitle}`} size='p2' />
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}>
						{sortedList.map((item) => (
							<MenuItem
								onClick={() => handleSort(item.sortName as TSortOption)}
								key={`${item.sortName}`}>
								{item.title}
							</MenuItem>
						))}
					</Menu>
				</div>
			)}
			<div className='sort-wrapper_list'>
				{sortedList.map((item) => (
					<Box
						className='btn-sort'
						onClick={() => handleSort(item.sortName as TSortOption)}
						key={`${item.sortName}`}>
						<BodyText
							text={`${item.title}`}
							size='p2'
							color={
								currentSort === `${item.sortName}`
									? 'var(--text-main)'
									: 'var(--text-secondary)'
							}
						/>
					</Box>
				))}
			</div>
		</div>
	);
};
