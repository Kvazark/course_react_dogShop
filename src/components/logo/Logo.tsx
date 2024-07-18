import { LogoIcon } from '../../images';
import './styles.scss';
import { SvgIcon, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export const Logo = () => {
	const isSmallScreen = useMediaQuery('(max-width:500px)');

	const isMedium = useMediaQuery('(max-width:800px)');

	const isMediumLarge = useMediaQuery('(max-width:1200px)');

	const viewBoxValue = useMemo(() => {
		if (isSmallScreen && isMedium) return '0 0 59 59';
		else if (isMedium) return '0 0 60 58';
		else if (isMediumLarge) return '0 0 190 58';
		else return '0 0 170 57';
	}, [isSmallScreen, isMedium, isMediumLarge]);

	return (
		<div className='logoBox'>
			<SvgIcon component={LogoIcon} viewBox={viewBoxValue} />
		</div>
	);
};
