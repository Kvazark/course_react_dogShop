import './profileStyled.scss';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { MailIcon, PhoneIcon } from '../../images';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
	const navigate = useNavigate();
	const currentUser = useContext(UserContext);

	const handleEditClick = () => {
		navigate('/profileEdit');
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
