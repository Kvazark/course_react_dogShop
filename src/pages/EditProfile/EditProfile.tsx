import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../storage/hooks';
import { BodyText, Button, HeaderText } from '../../components/ui';
import { SvgIcon, TextField } from '@mui/material';
import { LeftArrowIcon } from '../../assets/images';
import s from './editProfile.module.scss';
import { userSlice } from '../../storage/slices/user/user-slice';
import { withProtection } from '../../HOCs/withProtection';
import {
	useGetUserQuery,
	UserUpdateDto,
	useUpdateUserMutation,
} from '../../api/user';
import { useAppSelector } from '../../storage/hooks/useAppSelector';
import { userSelectors } from '../../storage/slices/user';

export const EditProfile = withProtection(() => {
	const dispatch = useAppDispatch();
	const [toUpdateUser] = useUpdateUserMutation();

	const location = useLocation();
	const navigate = useNavigate();
	const user = useAppSelector(userSelectors.getUser);
	const { refetch } = useGetUserQuery();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
	});

	const handleBackClick = () =>
		navigate(location?.state?.from ? location.state.from : '/');

	useEffect(() => {
		if (user) {
			const [firstName, lastName] = (user?.name || '').split(' ') || ['', ''];
			setFormData({
				firstName: firstName || '',
				lastName: lastName || '',
				phone: user.phone || '',
				email: user.email || '',
			});
		}
	}, [user]);

	const handleSaveInfo = async () => {
		const name = formData.firstName + ' ' + formData.lastName;
		const userData: UserUpdateDto = {
			email: formData.email,
			name,
			phone: formData.phone,
		};

		try {
			await toUpdateUser(userData).unwrap();
			dispatch(userSlice.actions.updateUserInfo(userData));
			await refetch();
			alert('Данные успешно обновились!');
		} catch (error) {
			alert('Ошибка при обновлении данных пользователя:' + error);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prevState) => ({ ...prevState, [field]: value }));
	};

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
						value={formData.firstName}
						onChange={(e) => handleInputChange('firstName', e.target.value)}
						placeholder='Введите своё имя'
					/>
					<TextField
						label='Фамилия'
						multiline
						maxRows={4}
						value={formData.lastName}
						onChange={(e) => handleInputChange('lastName', e.target.value)}
						placeholder='Введите свою фамилию'
					/>
					<TextField
						label='Телефон'
						multiline
						maxRows={4}
						value={formData.phone}
						onChange={(e) => handleInputChange('phone', e.target.value)}
						placeholder='Введите номер телефона'
					/>
					<TextField
						label='Почта'
						multiline
						maxRows={4}
						value={formData.email}
						onChange={(e) => handleInputChange('email', e.target.value)}
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
				{/*Здесь нуен div, чтобы кнопка не была на всю ширину s.wrapper_content*/}
				<div>
					<Button label='Сохранить' view='outlined' />
				</div>
			</div>
		</div>
	);
});
