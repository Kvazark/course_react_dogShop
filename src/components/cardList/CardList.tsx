import React, { ChangeEvent, useContext } from 'react';
import './cardListStyled.scss';
import usePagination from '../../hooks/usePagination';
import { Card } from '../card';
import {
	Pagination,
	PaginationItem,
	SvgIcon,
	useMediaQuery,
} from '@mui/material';
import { LeftArrowIcon, RightArrowIcon } from '../../images';
import { Button } from '../ui';
import {
	ProductContext,
	ProductContextInterface,
} from '../../context/product-context';

const PER_PAGE = 6;
export const CardList = () => {
	const { products } = useContext(ProductContext) as ProductContextInterface;

	const { currentPage, getCurrentData, setPagePaginated, countPages } =
		usePagination<IProduct>(products, PER_PAGE);

	function handlePageChange(_: ChangeEvent<unknown>, page: number) {
		setPagePaginated(page);
	}

	const isSmallScreen = useMediaQuery('(max-width:800px)');

	return (
		<div className='card-list-wrapper'>
			<div className='card-list-wrapper_cards'>
				{getCurrentData().map((item, index) => (
					<Card
						product={item}
						key={`${index}-card`}
						widthCard={236}
						variant='fullInfo'
					/>
				))}
			</div>
			<Pagination
				count={countPages}
				page={currentPage}
				onChange={handlePageChange}
				renderItem={(item) => (
					<PaginationItem
						className={
							item.type === 'page' && item.page === currentPage
								? 'current-page'
								: 'no-current-page'
						}
						slots={{
							previous: () => (
								<Button
									view='outlined'
									label={!isSmallScreen ? 'Назад' : ''}
									contentLeft={
										<SvgIcon component={LeftArrowIcon} inheritViewBox />
									}
								/>
							),
							next: () => (
								<Button
									view='outlined'
									label={!isSmallScreen ? 'Вперёд' : ''}
									contentRight={
										<SvgIcon component={RightArrowIcon} inheritViewBox />
									}
								/>
							),
						}}
						{...item}
					/>
				)}
			/>
		</div>
	);
};
