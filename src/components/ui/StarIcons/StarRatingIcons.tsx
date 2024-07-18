import { EmptyStarIcon, FillStarIcon, HalfStarIcon } from '../../../images';
import { SvgIcon } from '@mui/material';

type RatingProps = {
	rating: number;
	width?: string;
	color?: string;
};

export const StarRatingIcons = ({
	rating,
	width,
	color,
}: RatingProps): JSX.Element => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const emptyStars = rating > 0 ? 5 - fullStars - (hasHalfStar ? 1 : 0) : 5;

	const getStyled = () => {
		return {
			width: width ? width : '24px',
			height: width ? width : '24px',
		};
	};

	return (
		<div>
			{Array(fullStars)
				.fill(0)
				.map((_, index) => (
					<SvgIcon
						key={`fill-star-icon-${index}`}
						component={FillStarIcon}
						sx={{
							fill: color ? color : 'var(--main-color-darker)',
							'& path:nth-of-type(1)': {
								fill: color ? color : 'var(--main-color-darker)',
							},
							...getStyled(),
						}}
					/>
				))}
			{hasHalfStar && (
				<SvgIcon
					key='half-star-icon'
					component={HalfStarIcon}
					sx={{
						fill: color ? color : 'var(--main-color-darker)',
						'& path:nth-of-type(1)': {
							fill: color ? color : 'var(--main-color-darker)',
						},
						...getStyled(),
					}}
				/>
			)}
			{Array(emptyStars)
				.fill(0)
				.map((_, index) => (
					<SvgIcon
						key={`empty-star-icon-${index}`}
						component={EmptyStarIcon}
						sx={{
							stroke: 'var(--text-outline)',
							'& path:nth-of-type(1)': {
								fill: 'none',
							},
							...getStyled(),
						}}
					/>
				))}
		</div>
	);
};
