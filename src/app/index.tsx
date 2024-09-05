import '../global.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import './appStyled.scss';
import { useActionCreators } from '../storage/hooks/useActionCreators';
import { useEffect } from 'react';
import { useGetUserQuery } from '../api/user';
import { userActions, userSelectors } from '../storage/slices/user';
import { useAppSelector } from '../storage/hooks/useAppSelector';

export const App = () => {
	const { data: currentUser, refetch } = useGetUserQuery();
	const { setUser } = useActionCreators(userActions);
	const accessToken = useAppSelector(userSelectors.accessTokenSelector);

	useEffect(() => {
		if (accessToken) {
			refetch();
		}
	}, [accessToken, refetch]);

	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
	}, [currentUser, setUser]);

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
