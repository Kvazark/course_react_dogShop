import '../global.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import './appStyled.scss';
import { useActionCreators } from '../storage/hooks/useActionCreators';
import { useEffect } from 'react';
import { useGetUserQuery } from '../api/user';
import { userActions } from '../storage/slices/user';

export const App = () => {
	const { data: currentUser } = useGetUserQuery();
	const { setUser } = useActionCreators(userActions);

	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
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
