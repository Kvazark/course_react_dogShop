import { CardList } from '../../components/cardList';
import './catalogStyled.scss';
import { Box, Breadcrumbs, Link, SvgIcon, Typography } from '@mui/material';
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
import { useCallback, useEffect, useState } from 'react';
import { LoadMore } from '../../components/LoadMore';
import { productsSlice } from '../../storage/slices/products/products-slice';

export const Catalog = withProtection(() => {
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState<ProductsSearchFilter>({
		searchTerm: '',
		page: 1,
	});

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
				{products.length > 0 && <Sort />}
			</div>
			{products.length > 0 && (
				<CardList
					isError={isError}
					isLoading={isLoading}
					refetch={refetch}
					queryErrorMessage={getMessageFromError(
						error,
						'Unknown error with products'
					)}
					products={data?.products ?? []}
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexGrow: 1,
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '20px',
							textAlign: 'center',
							'& svg': {
								width: '70px',
								height: '70px',
								fill: 'var(--text-secondary)',
							},
						}}>
						<SvgIcon component={NotFoundIcon} />
						<BodyText
							text='Простите, по вашему запросу товаров не надено.'
							size='p1'
							fontWeight='700'
						/>
						<Button label='На главную' view='outlined' />
					</Box>
				</Box>
			)}
			{searchValue.searchTerm.length === 0 && <Carousel title='Вы смотрели' />}
		</div>
	);
});
