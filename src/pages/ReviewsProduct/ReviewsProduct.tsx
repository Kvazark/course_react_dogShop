import s from './reviewsProduct.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../storage/hooks';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { detailProductSelectors } from '../../storage/slices/detailProduct';
import { RequestStatus } from '../../types/store';
import { Spinner } from '../../components/spinner';
import { ErrorPage } from '../ErrorPage';
import React, { useEffect, useMemo, useState } from 'react';
import {
	fetchAverageRatingProduct,
	fetchDetailProduct,
	fetchReviewsProduct,
} from '../../storage/slices/detailProduct/thunk';
import {
	BodyText,
	Button,
	HeaderText,
	StarRatingIcons,
} from '../../components/ui';
import { SvgIcon } from '@mui/material';
import { CommentsIcon, LeftArrowIcon } from '../../images';
import { ReviewsDetailCard } from '../../components/detailCard';
import { declensionWords } from '../../utils';

export const ReviewsProduct = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [from, setFrom] = useState(location.pathname);

	useEffect(() => {
		setFrom(location.pathname);
	}, [location.pathname]);

	const { productId } = useParams<{ productId: string }>();
	const product = useAppSelector(detailProductSelectors.getInfo);
	const status = useAppSelector(detailProductSelectors.getStatus);
	const averageRating = useAppSelector(detailProductSelectors.getAverageRating);
	const reviewsProduct = useAppSelector(detailProductSelectors.getReviews);

	const handleBackClick = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate('/catalog');
		}
	};
	useEffect(() => {
		if (productId) {
			dispatch(fetchDetailProduct(productId));
			dispatch(fetchReviewsProduct(productId));
			dispatch(fetchAverageRatingProduct(productId));
		}
	}, [dispatch, productId]);

	const handleAddReview = () => {
		navigate(`/product/${productId}/addReviews`, { state: { from } });
	};
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

	const currentPrice = product
		? Math.round((product?.price * (100 - product?.discount)) / 100)
		: '';

	if (status === RequestStatus.Loading) {
		return <Spinner />;
	}

	if (status === RequestStatus.Failed) {
		return <ErrorPage />;
	}

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
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
				<HeaderText text={`Отзывы о товаре “${product?.name}”`} size='h1' />
			</div>
			<div className={s.wrapper_content}>
				<div className={s.wrapper_card}>
					<div className={s.wrapper_card_leftSide}>
						<div className={s.boxImage}>
							<img src={product?.images} alt='img' />
						</div>
						<div className={s.wrapper_card_leftSide_info}>
							<HeaderText text={product?.name} size='h3' />
							<div>
								<StarRatingIcons rating={averageRating?.rating || 0} />
								<BodyText
									text={wordReview}
									size='p2'
									color='var(--text-secondary)'
								/>
							</div>
						</div>
					</div>
					<div className={s.wrapper_card_rightSide}>
						<div className={s.wrapper_card_rightSide_price}>
							{product?.discount !== 0 && product?.discount !== null && (
								<span>{product?.price} ₽</span>
							)}
							<HeaderText
								text={`${currentPrice}₽`}
								size='h1'
								color={
									product?.discount !== 0
										? 'var(--custom-red)'
										: 'var(--text-main)'
								}
							/>
						</div>
						<Button label='В корзину' view='primary' stretch />
					</div>
				</div>
				<div className={s.wrapper_separator} />
				<div className={s.wrapper_leaveReview}>
					<div className={s.wrapper_leaveReview_title}>
						<SvgIcon component={CommentsIcon} />
						<BodyText
							text='Еще никто не оставил отзыв. Станьте первым! '
							size='p1'
							fontWeight='600'
						/>
					</div>
					<Button
						label='Написать отзыв'
						view='primary'
						onClick={handleAddReview}
					/>
				</div>
			</div>
			<ReviewsDetailCard />
		</div>
	);
};
