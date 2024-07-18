import s from './reviewsDetailCardStyled.module.scss';
import { BodyText, Button, CustomArrowCarousel, HeaderText } from '../../ui';
import React, { useEffect, useState } from 'react';
import Carousel, {
	ItemObject,
	ReactElasticCarouselProps,
} from 'react-elastic-carousel';
import { useMediaQuery } from '@mui/material';
import { Review } from './ui/Review';
import api from '../../../utils/api/productsApi';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../spinner';

export const ReviewsDetailCard = () => {
	const { productId } = useParams<{ productId: string }>();
	const [reviews, setReviews] = useState<IReview[]>([]);
	const [listImages, setListImages] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		if (productId) {
			api
				.getReviewsProductById(productId)
				.then((reviewsData) => {
					const allImages: string[] = [];
					reviewsData.forEach((review: IReview) => {
						////для карусели, чтобы видно было
						allImages.push(review.product.images);
						allImages.push(review.product.images);
						allImages.push(review.product.images);
						allImages.push(review.product.images);
					});

					setListImages(allImages);
					setReviews(reviewsData);
					setIsLoading(false);
				})
				.catch(() => {
					setHasError(true);
					setIsLoading(false);
				});
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

	if (hasError) {
		return null;
	}

	return (
		<div className={s.wrapper}>
			<HeaderText text='Отзывы' size='h2' />
			<div>
				<Button label='Написать отзыв' view='outlined' />
			</div>
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
					{reviews.map((item, index) => (
						<Review review={item} key={`${index}-review`} />
					))}
				</div>
			)}
		</div>
	);
};
