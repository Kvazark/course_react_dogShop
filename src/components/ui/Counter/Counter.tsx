import React, { useState } from 'react';
import { Box, SvgIcon } from '@mui/material';
import { MinusIcon, PlusIcon } from '../../../assets/images';
import { HeaderText } from '../Texts';
import { Button } from '../index';

type TCounterProps = {
	initialValue?: number;
	onGetCounter: (value: number) => void;
	width?: string;
	minValue?: number;
	maxValue?: number;
};

export const Counter = ({
	initialValue,
	onGetCounter,
	width,
	minValue,
	maxValue,
}: TCounterProps) => {
	const [counter, setCounter] = useState(initialValue || 0);

	const handleIncrement = () => {
		setCounter(counter + 1);
		onGetCounter(counter + 1);
	};

	const handleDecrement = () => {
		setCounter(counter - 1);
		onGetCounter(counter - 1);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				gap: '10px',
				border: '1px solid var(--text-outline)',
				borderRadius: '100px',
				padding: '3px 12px',
				width: width ? width : 'fit-content',
				alignItems: 'center',
			}}>
			<Button
				label={
					<SvgIcon
						component={MinusIcon}
						sx={{
							width: '24px',
							height: '24px',
							'& path:nth-of-type(1)': {
								fill:
									counter === 0 || counter === minValue
										? 'var(--text-secondary)'
										: 'var(--text-main)',
							},
						}}
					/>
				}
				view='transparent'
				onClick={handleDecrement}
				disabled={counter === 0 || counter === minValue}
			/>
			<HeaderText text={counter} size='h3' />
			<Button
				view='transparent'
				disabled={counter === maxValue}
				onClick={handleIncrement}
				label={
					<SvgIcon
						component={PlusIcon}
						sx={{
							width: '24px',
							height: '24px',
							'& path:nth-of-type(1)': {
								fill:
									counter === maxValue
										? 'var(--text-secondary)'
										: 'var(--text-main)',
							},
						}}
					/>
				}
			/>
		</Box>
	);
};
