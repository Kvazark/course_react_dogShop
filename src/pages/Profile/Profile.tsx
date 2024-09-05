import './profileStyled.scss';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { MailIcon, PhoneIcon } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../../storage/slices/user/user-slice';
import { useAppDispatch } from '../../storage/hooks';
import { withProtection } from '../../HOCs/withProtection';
import { withQuery } from '../../HOCs/withQuery';
import { useGetUserQuery, userApi } from '../../api/user';
import { getMessageFromError } from '../../utils/errorUtils';

interface IProfileComponentProps {
	currentUser: IUserBase;
}

export const Profile = withProtection(() => {
	const dispatch = useAppDispatch();

	const {
		data: currentUser,
		isError,
		isLoading,
		error,
		refetch,
	} = useGetUserQuery();

	if (!currentUser) {
		return null;
	}

	dispatch(userSlice.actions.setUser(currentUser));

	return (
		<ProfileComponent
			isError={isError}
			isLoading={isLoading}
			refetch={refetch}
			queryErrorMessage={getMessageFromError(
				error,
				'Unknown error with profile'
			)}
			currentUser={currentUser}
		/>
	);
});

export const ProfileComponent = withQuery(
	({ currentUser }: IProfileComponentProps) => {
		const dispatch = useAppDispatch();
		const navigate = useNavigate();
		const handleEditClick = () => {
			navigate('/profile/editInfo', { state: { from: location.pathname } });
		};

		const handleExitClick = () => {
			dispatch(userSlice.actions.clearUser());
			dispatch(userApi.util.resetApiState());
			navigate('/');
		};

		return (
			<div className='profile-wrapper'>
				<HeaderText text='Профиль' size='h1' />
				<div className='profile-wrapper_info'>
					<HeaderText text={currentUser?.name} size='h3' />
					<div className='profile-wrapper_info_contacts'>
						<div className='profile-wrapper_info_contacts_contact'>
							<PhoneIcon />
							<BodyText text={currentUser?.phone} size='s1' />
						</div>
						<div className='profile-wrapper_info_contacts_contact'>
							<MailIcon />
							<BodyText text={currentUser?.email} size='s1' />
						</div>
					</div>
				</div>
				<div className='profile-wrapper_buttons'>
					<Button label='Изменить' view='outlined' onClick={handleEditClick} />
					<Button
						dataTestid='btn-logout'
						label='Выйти'
						view='outlined'
						onClick={handleExitClick}
					/>
				</div>
			</div>
		);
	}
);
