import { CardList } from '../../components/cardList';
import './catalogStyled.scss';
import { Box, Breadcrumbs, Link, SvgIcon, Typography } from '@mui/material';
import { LeftArrowIcon, NotFoundIcon } from '../../assets/images';
import { BodyText, Button, Carousel, HeaderText } from '../../components/ui';
import { Sort } from '../../components/sort';
import { declensionWords } from '../../utils';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { productsSelectors } from '../../storage/slices/products';
import { withProtection } from '../../HOCs/withProtection';
import { useGetProductsQuery } from '../../api/products';
import { getMessageFromError } from '../../utils/errorUtils';
import { userSelectors } from '../../storage/slices/user';

export const Catalog = withProtection(() => {
	const searchTerm = useAppSelector(productsSelectors.getSearchTerm);
	const products = useAppSelector(productsSelectors.getProducts);
	const user = useAppSelector(userSelectors.getUser);

	const { data, isError, isLoading, error, refetch } = useGetProductsQuery(
		{},
		{
			skip: !user?.id,
		}
	);

	console.log(products);

	return (
		<div className='catalog-wrapper'>
			<div className='catalog-wrapper_header'>
				{searchTerm ? (
					<Typography
						sx={{
							fontSize: '28px',
							fontWeight: '300',
							'& span': {
								fontWeight: '800',
							},
						}}>
						По запросу <span>{searchTerm}</span> найдено{' '}
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
			{searchTerm.length > 0 && products.length === 0 && (
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
			{searchTerm.length === 0 && <Carousel title='Вы смотрели' />}
		</div>
	);
});
