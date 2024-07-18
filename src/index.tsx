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
				path: '/profile',
				element: <Profile />,
				errorElement: <ErrorPage />,
			},
			{
				path: '/favoritesProducts',
				element: <FavoritesPage />,
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
		<RouterProvider router={router} />
	</StrictMode>
);
