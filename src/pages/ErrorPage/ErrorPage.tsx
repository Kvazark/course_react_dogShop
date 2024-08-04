import { SvgIcon, useMediaQuery } from '@mui/material';
import { NotFoundIcon } from '../../assets/images';
import { BodyText, HeaderText } from '../../components/ui';
import './errorPageStyled.scss';

export const ErrorPage = () => {
	const isSmallScreen = useMediaQuery('(max-width:800px)');
	return (
		<div className='errorPage-wrapper'>
			<div className='icon'>
				<SvgIcon component={NotFoundIcon} />
			</div>
			<HeaderText
				text='404 - PAGE NOT FOUND'
				size={isSmallScreen ? 'h3' : 'h0'}
			/>
			<BodyText
				text='Попробуйте другой адрес, или обновите страницу позже.'
				size={isSmallScreen ? 's1' : 'p1'}
				fontWeight='600'
			/>
		</div>
	);
};
