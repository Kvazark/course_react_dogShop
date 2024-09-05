import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import storage, { persistor } from './storage';
import { router } from './router';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-unresolved
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<Provider store={storage}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					pauseOnHover
					theme='colored'
				/>
			</PersistGate>
		</Provider>
	</StrictMode>
);
