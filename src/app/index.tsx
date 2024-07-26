import '../global.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { useEffect } from 'react';
import './appStyled.scss';
import { useActionCreators } from '../storage/hooks/useActionCreators';
import { userActions } from '../storage/slices/user';
import { productsActions } from '../storage/slices/products';

export const App = () => {
	const { fetchUser } = useActionCreators(userActions);
	const { fetchProducts } = useActionCreators(productsActions);

	useEffect(() => {
		fetchProducts({});
		fetchUser();
	});

	return (
		<>
			<Header />
			<div className='wrapper-page'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};
