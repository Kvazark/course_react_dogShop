import { Box, SvgIcon, useMediaQuery } from '@mui/material';
import './footerStyled.scss';
import { Logo } from '../logo';
import { BodyText } from '../ui';
import {
	InstagramIcon,
	TelegramIcon,
	ViberIcon,
	VkIcon,
	WhatsappIcon,
} from '../../images';
import { FooterLinks, FooterMenu } from './ui';
import { listLinks, menuItems } from './constData';

export const Footer = () => {
	const isSmallScreen = useMediaQuery('(max-width:800px)');
	return (
		<Box
			component='footer'
			sx={{
				height: 'fit-content',
				backgroundColor: 'var(--main-color)',
			}}>
			<div className='footer-wrapper'>
				{!isSmallScreen && (
					<div className='footer-wrapper_logo'>
						<Logo />
						<BodyText text='© «Интернет-магазин DogFood.ru»' size='s2' />
					</div>
				)}
				<div className='footer-wrapper_links'>
					<FooterLinks links={listLinks.slice(0, 4)} />
				</div>
				<div className='footer-wrapper_links'>
					<FooterLinks links={listLinks.slice(4, 8)} />
				</div>
				<div className='footer-wrapper_networks'>
					<BodyText text='Мы на связи' size='p1' fontWeight='700' />
					<Box>
						<BodyText text='8 (999) 00-00-00' size='p1' fontWeight='700' />
						<BodyText text='dogfood.ru@gmail.com' size='s1' />
					</Box>
					<div className='footer-wrapper_networks_icons'>
						<SvgIcon component={TelegramIcon} />
						<SvgIcon component={WhatsappIcon} />
						<SvgIcon component={ViberIcon} />
						<SvgIcon component={InstagramIcon} />
						<SvgIcon component={VkIcon} />
					</div>
					{isSmallScreen && (
						<BodyText
							text='© «Интернет-магазин натуральных лакомств для собак HorDog.ru»'
							size='s2'
						/>
					)}
				</div>
				{isSmallScreen && (
					<div className='footer-wrapper_menu'>
						<FooterMenu itemsMenu={menuItems} />
					</div>
				)}
			</div>
		</Box>
	);
};
