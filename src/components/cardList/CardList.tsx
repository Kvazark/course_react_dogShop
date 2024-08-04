import React, { ChangeEvent } from 'react';
import './cardListStyled.scss';

import { Card } from '../card';
import {
	Pagination,
	PaginationItem,
	SvgIcon,
	useMediaQuery,
} from '@mui/material';
import { LeftArrowIcon, RightArrowIcon } from '../../assets/images';
import { Button } from '../ui';
import { usePagination } from '../../hooks';
import { withQuery } from '../../HOCs/withQuery';

interface ICardListProps {
	products: IProduct[];
}

export const CardList = withQuery(({ products }: ICardListProps) => {
	const { currentPage, getCurrentData, setPagePaginated, countPages } =
		usePagination<IProduct>(products, 6);

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
});
