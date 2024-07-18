import {
	CartIcon,
	CatalogIcon,
	DogIcon,
	FavoritesIcon,
	HomeIcon,
} from '../../images';
import { ReactNode } from 'react';

export type TItemLink = {
	id: string;
	link: string;
	title: string;
	icon?: ReactNode;
};

export const listLinks: TItemLink[] = [
	{
		id: 'nav-link-catalog-123',
		link: '/catalog',
		title: 'Каталог',
	},
	{
		id: 'nav-link-promo-456',
		link: '/stocks',
		title: 'Акции',
	},
	{
		id: 'nav-link-news-789',
		link: '/news',
		title: 'Новости',
	},
	{
		id: 'nav-link-reviews-abc',
		link: '/reviews',
		title: 'Отзывы',
	},
	{
		id: 'nav-link-payment-delivery-def',
		link: '/payment&delivery',
		title: 'Оплата и доставка',
	},
	{
		id: 'nav-link-faq-ghi',
		link: '/faq',
		title: 'Часто спрашивают',
	},
	{
		id: 'nav-link-feedback-jkl',
		link: '/feedback',
		title: 'Обратная связь',
	},
	{
		id: 'nav-link-contacts-mno',
		link: '/contacts',
		title: 'Контакты',
	},
];

export const menuItems: TItemLink[] = [
	{
		id: 'menu-item-home-123',
		link: '/',
		title: 'Главная',
		icon: <HomeIcon />,
	},
	{
		id: 'menu-item-catalog-456',
		link: '/catalog',
		title: 'Каталог',
		icon: <CatalogIcon />,
	},
	{
		id: 'menu-item-cart-789',
		link: '/card',
		title: 'Корзина',
		icon: <CartIcon />,
	},
	{
		id: 'menu-item-favorites-abc',
		link: '/favoritesProducts',
		title: 'Избранное',
		icon: <FavoritesIcon />,
	},
	{
		id: 'menu-item-profile-def',
		link: '/profile',
		title: 'Профиль',
		icon: <DogIcon />,
	},
];
