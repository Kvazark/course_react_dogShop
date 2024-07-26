import './profileStyled.scss';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { MailIcon, PhoneIcon } from '../../images';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { userSelectors } from '../../storage/slices/user';

export const Profile = () => {
	const navigate = useNavigate();
	const currentUser = useAppSelector(userSelectors.getUser);

	const handleEditClick = () => {
		navigate('/profile/editInfo', { state: { from: location.pathname } });
	};

	const handleExitClick = () => {
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
				<Button label='Выйти' view='outlined' onClick={handleExitClick} />
			</div>
		</div>
	);
};
