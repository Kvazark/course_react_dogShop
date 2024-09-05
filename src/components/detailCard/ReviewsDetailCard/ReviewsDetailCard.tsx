import s from './reviewsDetailCardStyled.module.scss';
import {
	BodyText,
	Button,
	CustomArrowCarousel,
	HeaderText,
	Review,
} from '../../ui';
import React, { useEffect, useState } from 'react';
import Carousel, {
	ItemObject,
	ReactElasticCarouselProps,
} from 'react-elastic-carousel';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../spinner';
import { DownArrowIcon, RightArrowIcon } from '../../../assets/images';
import { useAppSelector } from '../../../storage/hooks/useAppSelector';
import { detailProductSelectors } from '../../../storage/slices/detailProduct';
import { useGetReviewsProductByIdQuery } from '../../../api/products';

export const ReviewsDetailCard = () => {
	const navigate = useNavigate();
	const [from, setFrom] = useState(location.pathname);
	const [reviewsToShow, setReviewsToShow] = useState(2);

	useEffect(() => {
		setFrom(location.pathname);
	}, [location.pathname]);

	const { productId } = useParams<{ productId: string }>();

	const reviews = useAppSelector(detailProductSelectors.getReviews);
	const {
		data: reviewsData,
		isLoading,
		error,
	} = useGetReviewsProductByIdQuery(productId || '');

	const [listImages, setListImages] = useState<string[]>([]);

	useEffect(() => {
		if (reviewsData) {
			const allImages: string[] = [];
			reviewsData.forEach((review: IReview) => {
				allImages.push(review.product.images);
				allImages.push(review.product.images);
				allImages.push(review.product.images);
				allImages.push(review.product.images);
			});
			setListImages(allImages);
		}
	}, [productId]);

	const [currentIndex, setCurrentIndex] = useState(0);

	const isSmallScreen = useMediaQuery('(max-width:600px)');
	const isMediumScreen = useMediaQuery('(max-width:900px)');

	const carouselProps: ReactElasticCarouselProps = {
		isRTL: false,
		enableMouseSwipe: true,
		itemsToShow: isSmallScreen ? 3 : isMediumScreen ? 6 : 9,
		itemsToScroll: 1,
		itemPadding: [0, 2, 0, 2],
		showArrows: true,
		pagination: false,
		initialFirstItem: currentIndex,
		onChange: (currentItemObject: ItemObject, currentPageIndex: number) => {
			setCurrentIndex(currentPageIndex);
		},
		className: 'carouselReviews',
		renderArrow: ({ type, onClick, isEdge }) => (
			<CustomArrowCarousel type={type} onClick={onClick} isEdge={isEdge} />
		),
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return null;
	}

	const handleAddReview = () => {
		navigate(`/product/${productId}/addReviews`, { state: { from } });
	};

	const handleToReviews = () => {
		navigate(`/product/${productId}/reviews`, { state: { from } });
	};

	const isReviewsPage = location.pathname.includes('/reviews');

	const handleShowMoreComments = () => {
		setReviewsToShow(reviewsToShow + 2);
	};

	return (
		<div className={s.wrapper}>
			{!isReviewsPage && (
				<>
					<HeaderText text='Отзывы' size='h2' />
					<div>
						<Button
							label='Написать отзыв'
							view='outlined'
							onClick={handleAddReview}
						/>
					</div>
				</>
			)}
			{listImages.length > 0 && (
				<div className={s.wrapper_carousel}>
					<BodyText
						text='Фотографии наших покупателей'
						size='p1'
						fontWeight='700'
					/>
					<Carousel {...carouselProps}>
						{listImages.map((item, index) => (
							<div
								className={s.wrapper_carousel_image}
								key={`${index}-photo-carousel`}>
								<img src={item} alt='reviewPhoto' />
							</div>
						))}
					</Carousel>
				</div>
			)}
			{reviews && (
				<div className={s.wrapper_listReviews}>
					{reviews.slice(0, reviewsToShow).map((item, index) => (
						<Review review={item} key={`${index}-review`} />
					))}
				</div>
			)}
			{reviews && !isReviewsPage ? (
				<Button
					label='Все отзывы'
					view='outlined'
					contentRight={<RightArrowIcon />}
					stretch
					onClick={handleToReviews}
				/>
			) : (
				reviews &&
				reviewsToShow < reviews.length && (
					<Button
						label='Показать ещё'
						view='outlined'
						contentRight={<DownArrowIcon />}
						stretch
						onClick={handleShowMoreComments}
					/>
				)
			)}
		</div>
	);
};
