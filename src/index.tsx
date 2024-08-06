import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import storage, { persistor } from './storage';
import { router } from './router';
import { PersistGate } from 'redux-persist/integration/react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<Provider store={storage}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</StrictMode>
);
