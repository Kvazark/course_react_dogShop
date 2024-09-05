import { HeaderText } from '../../components/ui';
import { Link } from 'react-router-dom';
import { SvgIcon } from '@mui/material';
import { RightArrowIcon } from '../../assets/images';
import './homepageStyled.scss';

export const HomePage = () => {
	return (
		<div className='homepage-wrapper'>
			<div className='homepage-wrapper_btn-to-catalog'>
				<Link to={'/catalog'}>
					<HeaderText text='Каталог' size='h3' />
					<SvgIcon component={RightArrowIcon} />
				</Link>
			</div>
		</div>
	);
};
