import s from './addReviewStyled.module.scss';
import { useAppDispatch } from '../../storage/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import {
	detailProductActions,
	detailProductSelectors,
} from '../../storage/slices/detailProduct';
import React, { useState } from 'react';
import { ErrorPage } from '../ErrorPage';
import {
	BodyText,
	Button,
	HeaderText,
	MultipleImageUpload,
} from '../../components/ui';
import { Rating, SvgIcon } from '@mui/material';
import { LeftArrowIcon } from '../../assets/images';
import {
	useAddReviewProductByIdMutation,
	useGetAverageRatingForProductQuery,
} from '../../api/products';
import { IAddReview } from '../../api/interfaces';

export const AddReview = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();
	const product = useAppSelector(detailProductSelectors.getProduct);
	const [addNewReview] = useAddReviewProductByIdMutation();
	const { refetch: refetchAverageRating } = useGetAverageRatingForProductQuery(
		productId || ''
	);

	const [ratingValue, setRatingValue] = useState<number | null>(null);
	const [reviewText, setReviewText] = useState('');
	const handleReviewTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setReviewText(event.target.value);
	};

	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const handleUpload = (files: File[]) => {
		setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
	};
	const handleRemove = (index: number) => {
		const newFiles = [...uploadedFiles];
		newFiles.splice(index, 1);
		setUploadedFiles(newFiles);
	};

	const handleBackClick = () =>
		navigate(location?.state?.from ? location.state.from : '/catalog');

	const handleSubmitReview = () => {
		if (productId && ratingValue !== null && reviewText.trim() !== '') {
			const review: IAddReview = {
				rating: ratingValue,
				text: reviewText,
			};
			addNewReview({ productId, review })
				.then((result) => {
					if (!('error' in result)) {
						setRatingValue(null);
						setReviewText('');
						setUploadedFiles([]);
						refetchAverageRating()
							.unwrap()
							.then((updatedAverageRating) => {
								dispatch(
									detailProductActions.setAverageRating(updatedAverageRating)
								);
							});
					}
				})
				.catch((error) => {
					alert('Error adding review: ' + error);
				});
		}
	};

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
				{product && (
					<HeaderText text={`Отзыв о товаре ${product?.name}`} size='h1' />
				)}
			</div>
			{product ? (
				<>
					<div className={s.wrapper_separator} />
					<div className={s.wrapper_content}>
						<div className={s.wrapper_content_row}>
							<div className={s.leftSide}>
								<BodyText text='Общая оценка' size='p1' />
							</div>
							<Rating
								value={ratingValue}
								onChange={(event, newValue) => {
									setRatingValue(newValue);
								}}
							/>
						</div>
						<div className={s.wrapper_content_row}>
							<div className={s.leftSide}>
								<BodyText text='Комментарии' size='p1' />
							</div>
							<textarea
								placeholder='Поделитесь впечатлениями о товаре'
								value={reviewText}
								onChange={handleReviewTextChange}
							/>
						</div>
						<div className={s.wrapper_content_row}>
							<div className={s.leftSide}>
								<BodyText text='Добавьте фото' size='p1' />
							</div>
							<MultipleImageUpload
								onUpload={handleUpload}
								onRemove={handleRemove}
							/>
						</div>
						<div>
							<Button
								label='Отправить отзыв'
								view='primary'
								onClick={handleSubmitReview}
							/>
						</div>
					</div>
				</>
			) : (
				<ErrorPage />
			)}
		</div>
	);
};
