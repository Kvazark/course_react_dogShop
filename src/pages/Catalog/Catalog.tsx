import { CardList } from '../../components/cardList';
import './catalogStyled.scss';
import { Breadcrumbs, Link, SvgIcon, Typography } from '@mui/material';
import { LeftArrowIcon, NotFoundIcon } from '../../assets/images';
import { BodyText, Button, Carousel, HeaderText } from '../../components/ui';
import { Sort } from '../../components/sort';
import { declensionWords } from '../../utils';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import {
	productsActions,
	productsSelectors,
} from '../../storage/slices/products';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../api/products';
import { getMessageFromError } from '../../utils/errorUtils';
import { userSelectors } from '../../storage/slices/user';
import { useAppDispatch } from '../../storage/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { LoadMore } from '../../components/LoadMore';
import { productsSlice } from '../../storage/slices/products/products-slice';
import { TSortOption } from '../../components/sort/Sort';
// import {
// 	sortByDiscount,
// 	sortByNewest,
// 	sortByPopular,
// 	sortByPriceHighToLow,
// 	sortByPriceLowToHigh,
// } from '../../utils/sortProducts';

export const Catalog = withProtection(() => {
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState<ProductsSearchFilter>({
		searchTerm: '',
		page: 1,
	});

	const [currentSort, setCurrentSort] = useState<TSortOption>('newest');

	const currentSearchFilter = useAppSelector(productsSelectors.getSearchFilter);
	const products = useAppSelector(productsSelectors.getProducts);
	const user = useAppSelector(userSelectors.getUser);

	const { data, isError, isLoading, isFetching, error, refetch } =
		useGetProductsQuery(searchValue, {
			skip: !user?.id,
		});

	const isEndOfList = data && data.products.length >= data.length;

	const loadMoreProducts = useCallback(() => {
		if (!isEndOfList)
			setSearchValue((prev) => ({ ...prev, page: prev.page + 1 }));
	}, [isEndOfList]);

	//const [sortedProducts, setSortedProducts] = useState(products);

	const handleSortChange = async (sort: TSortOption) => {
		setCurrentSort(sort);
		switch (sort) {
			case 'newest':
				//setSortedProducts(sortByNewest(products));
				break;
			case 'price-low-to-high':
				//setSortedProducts(sortByPriceLowToHigh(products));
				break;
			case 'price-high-to-low':
				//setSortedProducts(sortByPriceHighToLow(products));
				break;
			case 'rating':
				//setSortedProducts(await sortByRating(products));
				break;
			case 'discount':
				//setSortedProducts(sortByDiscount(products));
				break;
			case 'popular':
				//setSortedProducts(sortByPopular(products));
				break;
			default:
			//setSortedProducts(products);
		}
	};
	useEffect(() => {
		if (data) {
			dispatch(
				productsSlice.actions.setProducts({
					products: data.products,
					length: data.length,
				})
			);
			dispatch(productsActions.setSearchFilter(searchValue));
		}
	}, [data, dispatch, searchValue]);

	useEffect(() => {
		if (currentSearchFilter.searchTerm !== searchValue.searchTerm) {
			setSearchValue(currentSearchFilter);
		}
	}, [currentSearchFilter, searchValue]);

	return (
		<div className='catalog-wrapper'>
			<div className='catalog-wrapper_header'>
				{searchValue.searchTerm ? (
					<Typography
						sx={{
							fontSize: '28px',
							fontWeight: '300',
							'& span': {
								fontWeight: '800',
							},
						}}>
						По запросу <span>{searchValue.searchTerm}</span> найдено{' '}
						{declensionWords(products.length, ['товар', 'товара', 'товаров'])}
					</Typography>
				) : (
					<div className='catalog-wrapper_breadcrumbs'>
						<Breadcrumbs aria-label='breadcrumb'>
							<Link underline='hover' color='inherit' href='/'>
								<div className='catalog-wrapper_breadcrumbs_text'>
									<LeftArrowIcon />
									<BodyText text='Главная' size='p2' />
								</div>
							</Link>
						</Breadcrumbs>
						<HeaderText text='Каталог' size='h1' />
					</div>
				)}
				{products.length > 0 && (
					<Sort onSortChange={handleSortChange} currentSort={currentSort} />
				)}
			</div>
			{/*Сортировку с бэка взять*/}
			{products.length > 0 && (
				<CardList
					isError={isError}
					isLoading={isLoading}
					refetch={refetch}
					queryErrorMessage={getMessageFromError(
						error,
						'Unknown error with products'
					)}
					products={products ?? []}
				/>
			)}
			{!!data?.products?.length && (
				<LoadMore
					isLoading={isFetching}
					action={loadMoreProducts}
					isEndOfList={isEndOfList}
				/>
			)}
			{searchValue.searchTerm.length > 0 && products.length === 0 && (
				<div className='errorPage-wrapper'>
					<div className='icon'>
						<SvgIcon component={NotFoundIcon} />
					</div>
					<BodyText
						text='Простите, по вашему запросу товаров не надено.'
						size='p1'
						fontWeight='700'
					/>
					<Button label='На главную' view='outlined' />
				</div>
			)}
			{searchValue.searchTerm.length === 0 && <Carousel title='Вы смотрели' />}
		</div>
	);
});
