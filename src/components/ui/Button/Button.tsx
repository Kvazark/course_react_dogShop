import { Button } from '@mui/material';
import { ReactNode } from 'react';

type TButtonProps = {
	label: string | ReactNode;
	contentLeft?: ReactNode;

	contentRight?: ReactNode;
	view: 'primary' | 'secondary' | 'outlined' | 'transparent' | 'link';
	disabled?: boolean;
	stretch?: boolean;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
};
export const CustomButton = ({
	label,
	contentLeft,
	contentRight,
	view,
	disabled,
	stretch,
	onClick,
	type,
}: TButtonProps) => {
	const getButtonStyles = () => {
		switch (view) {
			case 'primary':
				return {
					background: disabled ? 'var(--text-outline)' : 'var(--main-color)',
					borderRadius: '55px',
				};
			case 'outlined':
				return {
					border: '1px solid rgb(207, 216, 220)',
					background: 'var(--white-color)',
					borderRadius: '87px',
				};
			case 'secondary':
				return {
					background: 'var(--text-form)',
					borderRadius: '87px',
					minWidth: '24px',
					padding: '6px 8px',
				};
			case 'transparent':
				return {
					background: 'transparent',
					padding: '0',
					minWidth: '16px		',
				};
			case 'link':
				return {
					background: 'transparent',
					padding: '0',
					height: 'fit-content',
					minWidth: '16px',
					gap: '4px',
					'&:hover': {
						background: 'transparent',
						'svg path': {
							fill: 'var(--text-main)',
						},
						color: 'var(--text-main)',
					},
					'svg path': {
						fill: 'var(--text-secondary)',
					},
				};
		}
	};

	const buttonStyles = getButtonStyles();

	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			type={type}
			sx={{
				display: 'flex',
				gap: '8px',
				justifyContent: 'center',
				alignItems: 'center',
				padding: contentLeft || contentRight ? '12px 24px' : '10px 18px',
				color: 'var(--text-main)',
				fontWeight: '700',
				fontSize: '16px',
				textTransform: 'none',
				width: stretch ? '100%' : 'auto',
				height: contentLeft || contentRight || stretch ? '48px' : '40px',
				...buttonStyles,
			}}
			disableRipple>
			{contentLeft}
			{label}
			{contentRight}
		</Button>
	);
};
