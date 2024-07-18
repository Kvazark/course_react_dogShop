import Carousel, {
	ItemObject,
	ReactElasticCarouselProps,
} from 'react-elastic-carousel';
import { Card } from '../../card';
import React, { useEffect, useState } from 'react';
import { CustomArrowCarousel, HeaderText } from '../index';
import './carouselStyled.scss';
import { useMediaQuery } from '@mui/material';
import api from '../../../utils/api/productsApi';

type TCarouselProps = {
	// recentlyViewed: IProduct[];
	title: string;
};
export const CustomCarousel = ({ title }: TCarouselProps) => {
	const [recentlyViewed, setRecentlyViewed] = useState<IProduct[]>([]);
	useEffect(() => {
		api.getAllInfo().then(([productData]) => {
			setRecentlyViewed(productData.products);
		});
	}, []);

	const [currentIndex, setCurrentIndex] = useState(0);
	const isSmallScreen = useMediaQuery('(max-width:600px)');
	const isMediumScreen = useMediaQuery('(max-width:900px)');

	const carouselProps: ReactElasticCarouselProps = {
		isRTL: false,
		enableMouseSwipe: true,
		itemsToShow: isSmallScreen ? 2 : isMediumScreen ? 3 : 4,
		itemsToScroll: 1,
		itemPadding: [0, 5, 0, 5],
		pagination: false,
		initialFirstItem: currentIndex,
		onChange: (currentItemObject: ItemObject, currentPageIndex: number) => {
			setCurrentIndex(currentPageIndex);
		},
		renderArrow: ({ type, onClick, isEdge }) => (
			<CustomArrowCarousel
				type={type}
				onClick={onClick}
				isEdge={isEdge}
				size='medium'
			/>
		),
		className: 'carouselCatalog',
	};

	return (
		<div className='carousel-wrapper'>
			<div className='carousel-wrapper_header'>
				<HeaderText text={title} size='h1' />
			</div>
			<Carousel {...carouselProps}>
				{recentlyViewed.map((item, index) => (
					<Card
						product={item}
						key={`${index}-card-carousel`}
						widthCard={isSmallScreen ? 238 : isMediumScreen ? 195 : 150}
					/>
				))}
			</Carousel>
		</div>
	);
};
