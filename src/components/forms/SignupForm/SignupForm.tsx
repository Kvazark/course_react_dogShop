import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../../api/authApi';
import { SignUpFormValues } from './types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from '../helpers/validator';
import { userActions } from '../../../storage/slices/user';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { Box, Container, TextField } from '@mui/material';
import { BodyText, Button, HeaderText } from '../../ui';
import { SIGN_UP_FORM_SETTINGS } from './helpers/constants';

export const SignUpForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [signUpRequestFn] = useSignUpMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();

			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);
			toast.success('Вы успешно зарегистрированы!');
			navigate('/signIn');
		} catch (error) {
			console.log({ error });
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при регистрации пользователя'
				)
			);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				data-testid={SIGN_UP_FORM_SETTINGS.TEST_IDS.FORM_TITLE}
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}>
				<HeaderText text='Регистрация' size='h1' />
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{
						mt: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: '24px',
					}}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Введите email'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								data-testid={SIGN_UP_FORM_SETTINGS.TEST_IDS.EMAIL}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Введите пароль'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								data-testid={SIGN_UP_FORM_SETTINGS.TEST_IDS.PASSWORD}
								{...field}
							/>
						)}
					/>
					<BodyText
						text='Регистрируясь на сайте, вы соглашаетесь
						с нашими Правилами и Политикой конфиденциальности
						и соглашаетесь на информационную рассылку.'
						size='s1'
						color='var(--text-secondary)'
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						<Button
							type='submit'
							dataTestid={SIGN_UP_FORM_SETTINGS.TEST_IDS.SUBMIT_BTN}
							view='primary'
							label='Зарегистрироваться'
							disabled={isSubmitted && (!isValid || isSubmitting)}
						/>
						<Button
							view='outlined'
							label='Войти'
							onClick={() => navigate('/signIn')}
						/>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
