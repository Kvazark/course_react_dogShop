import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { Catalog } from './pages/Catalog';
import { DetailCard } from './pages/DetailCard';
import { ReviewsProduct } from './pages/ReviewsProduct';
import { AddReview } from './pages/AddReview';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { FavoritesPage } from './pages/FavoritesPage';
import { FaqPage } from './pages/FAQ/FaqPage';
import { SignInPage, SignUpPage } from './pages/Authentication';
import React from 'react';
import { Cart } from './pages/CartPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/catalog',
				element: <Catalog />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/product/:productId',
				element: <DetailCard />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/product/:productId/reviews',
				element: <ReviewsProduct />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/product/:productId/addReviews',
				element: <AddReview />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/profile',
				element: <Profile />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/profile/editInfo',
				element: <EditProfile />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/favoritesProducts',
				element: <FavoritesPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/faq',
				element: <FaqPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/cart',
				element: <Cart />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/signUp',
				element: <SignUpPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/signIn',
				element: <SignInPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/*',
				element: <ErrorPage />,
			},
		],
	},
]);
