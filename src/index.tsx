import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import storage from './storage';
import { router } from './router';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<Provider store={storage}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
