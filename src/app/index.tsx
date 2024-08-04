import '../global.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import './appStyled.scss';
import { useActionCreators } from '../storage/hooks/useActionCreators';
import { useGetProductsQuery } from '../api/products';
import { productsActions } from '../storage/slices/products';
import { useEffect } from 'react';
import { useGetUserQuery } from '../api/user';
import { userActions } from '../storage/slices/user';

export const App = () => {
	const { data: currentUser } = useGetUserQuery();
	const { data: dataProducts } = useGetProductsQuery({});
	const { setUser } = useActionCreators(userActions);
	const { setProducts } = useActionCreators(productsActions);

	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
		if (dataProducts) setProducts(dataProducts);
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
