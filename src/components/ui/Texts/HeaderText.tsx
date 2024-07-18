import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type THeaderTextProps = {
	text: string | ReactNode;
	size?: 'h0' | 'h1' | 'h2' | 'h3';

	color?: string;
};
export const HeaderText = ({ text, size = 'h2', color }: THeaderTextProps) => {
	const getTextStyles = () => {
		switch (size) {
			case 'h0':
				return {
					fontSize: '48px',
					fontWeight: '900',
					lineHeight: '52px',
				};
			case 'h1':
				return {
					fontSize: '28px',
					fontWeight: '800',
					lineHeight: '32px',
				};
			case 'h2':
				return {
					fontSize: '24px',
					fontWeight: '800',
					lineHeight: '28px',
				};
			case 'h3':
				return {
					fontSize: '20px',
					fontWeight: '800',
					lineHeight: '24px',
				};
		}
	};
	return (
		<Typography sx={{ color: color, ...getTextStyles() }}>{text}</Typography>
	);
};
