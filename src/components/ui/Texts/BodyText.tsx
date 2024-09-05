import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type TBodyTextProps = {
	text: string | ReactNode;
	size?: 'p1' | 'p2' | 's1' | 's2';

	fontWeight?: string;
	color?: string;
};
export const BodyText = ({
	text,
	size = 'p2',
	fontWeight,
	color = 'var(--text-main)',
}: TBodyTextProps) => {
	const getTextStyles = () => {
		switch (size) {
			case 'p1':
				return {
					fontSize: '16px',
					fontWeight: fontWeight ? fontWeight : '400',
					lineHeight: '20px',
				};
			case 'p2':
				return {
					fontSize: '14px',
					fontWeight: fontWeight ? fontWeight : '400',
					lineHeight: '20px',
				};
			case 's1':
				return {
					fontSize: '16px',
					fontWeight: fontWeight ? fontWeight : '400',
					lineHeight: '20px',
				};
			case 's2':
				return {
					fontSize: '9px',
					fontWeight: fontWeight ? fontWeight : '400',
					lineHeight: '12px',
				};
		}
	};
	return (
		<Typography sx={{ color: color, ...getTextStyles() }}>{text}</Typography>
	);
};
