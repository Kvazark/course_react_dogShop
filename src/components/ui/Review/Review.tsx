import s from './reviewStyled.module.scss';
import { BodyText, HeaderText, StarRatingIcons } from '../index';
import React from 'react';
import { formatDate } from '../../../utils';

type TReviewProps = {
	review: IReview;
};
export const Review = ({ review }: TReviewProps) => {
	return (
		<>
			<div className={s.separator}></div>
			<div className={s.reviewContainer}>
				<div className={s.reviewContainer_header}>
					<div className={s.reviewContainer_header_info}>
						<HeaderText text={review.user.name} size='h2' />
						<span>
							<BodyText
								text={formatDate(review.createdAt)}
								size='p2'
								color='var(--text-secondary)'
							/>
						</span>
					</div>
					<div>
						<StarRatingIcons rating={review.rating} />
					</div>
					<BodyText text={review.user.about} color='var(--text-secondary)' />
				</div>
				<div className={s.reviewContainer_content}>
					<BodyText text={review.text} size='p2' />
				</div>
				{review.product.images && (
					<div className={s.reviewContainer_photos}>
						<div className={s.reviewContainer_photos_container}>
							<img src={review.product.images} alt='reviewPhoto' />
						</div>
					</div>
				)}
			</div>
		</>
	);
};
