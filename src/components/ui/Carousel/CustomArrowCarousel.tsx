import { Button } from '../index';
import { LeftArrowIcon, RightArrowIcon } from '../../../images';
import React from 'react';
import { SvgIcon } from '@mui/material';

type TArrowProps = {
	type: 'PREV' | 'NEXT';
	onClick: () => void;
	isEdge: boolean;
	size?: 'small' | 'medium';
};
export const CustomArrowCarousel = ({
	type,
	onClick,
	isEdge,
	size = 'small',
}: TArrowProps): JSX.Element => {
	return (
		type &&
		onClick && (
			<Button
				label={
					<SvgIcon
						component={type === 'PREV' ? LeftArrowIcon : RightArrowIcon}
						sx={{
							width: size === 'small' ? '16px' : '24px',
							height: size === 'small' ? '16px' : '24px',
						}}
					/>
				}
				view='secondary'
				onClick={onClick}
				disabled={isEdge}
			/>
		)
	);
};
