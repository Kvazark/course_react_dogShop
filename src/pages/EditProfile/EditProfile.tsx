import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { userSelectors } from '../../storage/slices/user';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../storage/hooks';
import { RequestStatus } from '../../types/store';
import { Spinner } from '../../components/spinner';
import { ErrorPage } from '../ErrorPage';
import { fetchEditUser, fetchUser } from '../../storage/slices/user/thunk';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { SvgIcon, TextField } from '@mui/material';
import { LeftArrowIcon } from '../../images';
import s from './editProfile.module.scss';

export const EditProfile = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const currentUser = useAppSelector(userSelectors.getUser);
	const status = useAppSelector(userSelectors.getUserStatus);

	useEffect(() => {
		if (currentUser) {
			dispatch(fetchUser());
		}
	}, [dispatch]);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');

	const handleBackClick = () => {
		if (location.state && location.state.from) {
			navigate(location.state.from);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		if (currentUser) {
			const [firstName, lastName] = (currentUser?.name || '').split(' ') || [
				'',
				'',
			];
			setFirstName(firstName || '');
			setLastName(lastName || '');
			setPhone(currentUser.phone || '');
			setEmail(currentUser.email || '');
		}
	}, [currentUser]);

	const handleSaveInfo = async () => {
		const name = firstName + ' ' + lastName;
		const userData = { ...currentUser, email: email, name: name, phone: phone };
		dispatch(fetchEditUser(userData));
	};
	if (status === RequestStatus.Loading) {
		return <Spinner />;
	}

	if (status === RequestStatus.Failed) {
		return <ErrorPage />;
	}

	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<Button
					label={<BodyText text='Назад' size='p2' />}
					view='link'
					contentLeft={
						<SvgIcon
							component={LeftArrowIcon}
							sx={{ width: '14px', height: '14px' }}
						/>
					}
					onClick={handleBackClick}
				/>
				<HeaderText text='Мои данные' size='h1' />
			</div>
			<div className={s.wrapper_content}>
				<div className={s.wrapper_content_containerInfo}>
					<TextField
						label='Имя'
						multiline
						maxRows={4}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder='Введите своё имя'
					/>
					<TextField
						label='Фамилия'
						multiline
						maxRows={4}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder='Введите свою фамилию'
					/>
					<TextField
						label='Телефон'
						multiline
						maxRows={4}
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						// placeholder='Имя'
					/>
					<TextField
						label='Почта'
						multiline
						maxRows={4}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Введите почту'
					/>
				</div>
				<div>
					<Button label='Сохранить' view='outlined' onClick={handleSaveInfo} />
				</div>
			</div>
			<div className={s.wrapper_content}>
				<div className={s.wrapper_content_containerPas}>
					<TextField
						label=''
						multiline
						maxRows={4}
						placeholder='Старый пароль'
					/>
					<TextField
						label=''
						multiline
						maxRows={4}
						placeholder='Новый пароль'
					/>
				</div>
				<div>
					<Button label='Сохранить' view='outlined' />
				</div>
			</div>
		</div>
	);
};
