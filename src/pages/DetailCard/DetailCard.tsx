import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api/productsApi';
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

export const DetailCard = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();
	const [product, setProduct] = useState<IProduct | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [averageRating, setAverageRating] = useState<{ rating: number }>({
		rating: 0,
	});

	const wordReview = useMemo(() => {
		if (product) {
			return declensionWords(product?.reviews.length, [
				'отзыв',
				'отзыва',
				'отзывов',
			]);
		}
		return '';
	}, [product]);

	const infoProduct = useMemo(() => {
		return product?.reviews.find((review) => review.product.id === productId)
			?.product;
	}, [product?.reviews, productId]);

	useEffect(() => {
		if (productId) {
			api
				.getProductById(productId)
				.then((productData) => {
					setProduct(productData);
					setIsLoading(false);
				})
				.catch(() => {
					setHasError(true);
					setIsLoading(false);
				});
		}
	}, [productId, product]);
	useEffect(() => {
		if (productId) {
			api
				.getAverageRatingProductById(productId)
				.then((ratingData) => {
					setAverageRating(ratingData);
					setIsLoading(false);
				})
				.catch(() => {
					setHasError(true);
					setIsLoading(false);
				});
		}
	}, [productId, product]);

	const handleBackClick = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate('/catalog');
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (hasError) {
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
						<StarRatingIcons rating={averageRating.rating} width='16px' />
					</div>
					{product?.reviews.length !== undefined &&
					product?.reviews?.length > 0 ? (
						<Link to={'/'}>
							<BodyText text={wordReview} size='p2' />
						</Link>
					) : (
						<div style={{ color: 'var(--text-outline)' }}>
							<BodyText text='0 отзывов' size='p2' />
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
	return <ErrorPage />;
};
