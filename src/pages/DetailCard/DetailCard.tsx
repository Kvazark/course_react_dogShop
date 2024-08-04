import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './detailCard.scss';
import {
	BodyText,
	Button,
	HeaderText,
	StarRatingIcons,
} from '../../components/ui';
import { SvgIcon } from '@mui/material';
import { LeftArrowIcon } from '../../assets/images';
import {
	BodyDetailCard,
	ReviewsDetailCard,
	SpecificationsDetailCard,
} from '../../components/detailCard';
import { declensionWords } from '../../utils';
import {
	useGetAverageRatingForProductQuery,
	useGetProductQuery,
	useGetReviewsProductByIdQuery,
} from '../../api/products';
import { Spinner } from '../../components/spinner';
import { ErrorPage } from '../ErrorPage';
import { useAppDispatch } from '../../storage/hooks';
import {
	setAverageRating,
	setProduct,
	setReviews,
} from '../../storage/slices/detailProduct/detail-product-slice';

export const DetailCard = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();
	// Введён currentProduct за тем, что эффект, который обновляет состояние Redux, не срабатывает при переходе
	// к странице отзывов через компонент Link, т.к. компонент DetailCard не обновляется,
	// потому что он уже был смонтирован ранее.
	const [currentProduct, setCurrentProduct] = useState<IProduct>();

	const {
		data: dataProduct,
		isError,
		isLoading,
	} = useGetProductQuery(productId || '');

	const { data: reviewsProduct } = useGetReviewsProductByIdQuery(
		productId || ''
	);

	const { data: averageRating } = useGetAverageRatingForProductQuery(
		productId || ''
	);

	useEffect(() => {
		if (dataProduct) {
			dispatch(setProduct(dataProduct));
			setCurrentProduct(dataProduct);
		}
		dispatch(setReviews(reviewsProduct || []));
		dispatch(
			setAverageRating({
				rating: averageRating?.rating || 0,
			})
		);
	}, [productId, reviewsProduct, dispatch, averageRating, dataProduct]);

	const wordReview = useMemo(() => {
		if (dataProduct) {
			return declensionWords(reviewsProduct ? reviewsProduct.length : 0, [
				'отзыв',
				'отзыва',
				'отзывов',
			]);
		}
		return '';
	}, [dataProduct, reviewsProduct]);

	const infoProduct = useMemo(() => {
		return dataProduct?.reviews.find(
			(review) => review.product.id === productId
		)?.product;
	}, [dataProduct?.reviews, productId]);

	const handleBackClick = () =>
		navigate(location?.state?.from ? location.state.from : '/catalog');

	if (isLoading && !isError) {
		return <Spinner />;
	}

	return !isError && dataProduct ? (
		<div className='detailCard-wrapper'>
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
			<HeaderText text={dataProduct?.name} size='h1' />
			<div className='detailCard-wrapper_content_header'>
				<BodyText
					text={
						<>
							<span>Артикул:</span> {dataProduct?.id}
						</>
					}
					size='p2'
				/>
				<div className='detailCard-wrapper_content_stars'>
					<StarRatingIcons
						rating={averageRating ? averageRating.rating : 0}
						width='16px'
					/>
				</div>
				{!!currentProduct?.reviews?.length ? (
					<Link
						to={`/product/${currentProduct.id}/reviews`}
						state={{ from: location.pathname }}>
						<BodyText
							text={wordReview}
							size='p2'
							color='var(--main-color-darker)'
						/>
					</Link>
				) : (
					<div style={{ color: 'var(--text-outline)' }}>
						<BodyText
							text='0 отзывов'
							size='p2'
							color='var(--text-secondary)'
						/>
					</div>
				)}
			</div>
			<div className='detailCard-wrapper_content'>
				{dataProduct && <BodyDetailCard productProps={dataProduct} />}
				{dataProduct && infoProduct && (
					<SpecificationsDetailCard
						price={Math.round(
							(dataProduct.price * (100 - dataProduct.discount)) / 100
						)}
						wight={infoProduct.wight !== null ? infoProduct.wight : ''}
						description={infoProduct.description}
					/>
				)}
				<ReviewsDetailCard />
			</div>
		</div>
	) : (
		<ErrorPage />
	);
};
