import { createRoot } from 'react-dom/client';
import { App } from './app';
import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Profile } from './pages/Profile';
import { ErrorPage } from './pages/ErrorPage';
import { Catalog } from './pages/Catalog';
import { FavoritesPage } from './pages/FavoritesPage';
import { DetailCard } from './pages/DetailCard';
import { FaqPage } from './pages/FAQ/FaqPage';
import { Provider } from 'react-redux';
import storage from './storage';
import { ReviewsProduct } from './pages/ReviewsProduct';
import { AddReview } from './pages/AddReview';
import { EditProfile } from './pages/EditProfile';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
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
				path: '/*',
				element: <ErrorPage />,
			},
		],
	},
]);
root.render(
	<StrictMode>
		<Provider store={storage}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
