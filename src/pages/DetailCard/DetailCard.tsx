import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage';
import { Spinner } from '../../components/spinner';
import './detailCard.scss';
import {
	BodyText,
	Button,
	HeaderText,
	StarRatingIcons,
} from '../../components/ui';
import { SvgIcon } from '@mui/material';
import { LeftArrowIcon } from '../../images';
import {
	BodyDetailCard,
	ReviewsDetailCard,
	SpecificationsDetailCard,
} from '../../components/detailCard';
import { declensionWords } from '../../utils';
import { useAppDispatch } from '../../storage/hooks';
import { detailProductSelectors } from '../../storage/slices/detailProduct';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { RequestStatus } from '../../types/store';
import {
	fetchAverageRatingProduct,
	fetchDetailProduct,
	fetchReviewsProduct,
} from '../../storage/slices/detailProduct/thunk';

export const DetailCard = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();

	const product = useAppSelector(detailProductSelectors.getInfo);
	const status = useAppSelector(detailProductSelectors.getStatus);
	const averageRating = useAppSelector(detailProductSelectors.getAverageRating);
	const reviewsProduct = useAppSelector(detailProductSelectors.getReviews);

	useEffect(() => {
		if (productId) {
			dispatch(fetchDetailProduct(productId));
			dispatch(fetchAverageRatingProduct(productId));
			dispatch(fetchReviewsProduct(productId));
		}
	}, [dispatch, productId]);

	const wordReview = useMemo(() => {
		if (product) {
			return declensionWords(reviewsProduct ? reviewsProduct.length : 0, [
				'отзыв',
				'отзыва',
				'отзывов',
			]);
		}
		return '';
	}, [product, reviewsProduct]);

	const infoProduct = useMemo(() => {
		return product?.reviews.find((review) => review.product.id === productId)
			?.product;
	}, [product?.reviews, productId]);

	const handleBackClick = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate('/catalog');
		}
	};

	if (status === RequestStatus.Loading) {
		return <Spinner />;
	}

	if (status === RequestStatus.Failed) {
		return <ErrorPage />;
	}

	if (product) {
		return (
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
				<HeaderText text={product?.name} size='h1' />
				<div className='detailCard-wrapper_content_header'>
					<BodyText
						text={
							<>
								<span>Артикул:</span> {product?.id}
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
					{reviewsProduct?.length !== undefined &&
					reviewsProduct?.length > 0 ? (
						<Link
							to={`/product/${productId}/reviews`}
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
					<BodyDetailCard product={product} />
					{infoProduct && (
						<SpecificationsDetailCard
							price={Math.round(
								(product.price * (100 - product.discount)) / 100
							)}
							wight={infoProduct.wight !== null ? infoProduct.wight : ''}
							description={infoProduct.description}
						/>
					)}
					<ReviewsDetailCard />
				</div>
			</div>
		);
	}
	return <Spinner />;
};
