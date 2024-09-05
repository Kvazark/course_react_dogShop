import { FC } from 'react';
import { SignUpFormValues } from '../SignupForm/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from '../helpers/validator';
import { userActions } from '../../../storage/slices/user';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../../utils/errorUtils';
import { Box, Container, TextField } from '@mui/material';
import { useSignInMutation } from '../../../api/authApi';
import { Button, HeaderText } from '../../ui';
import { SIGN_UP_FORM_SETTINGS } from '../SignupForm/helpers/constants';

export const SignInForm: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [signUpRequestFn] = useSignInMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();
			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);
			toast.success('Вы успешно вошли в аккаунт!');
			navigate('/');
		} catch (error) {
			console.log({ error });
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при авторизации пользователя'
				)
			);
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<HeaderText text='Войти' size='h1' />
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<Box
						component='form'
						onSubmit={handleSubmit(submitHandler)}
						noValidate
						sx={{ mt: 1 }}>
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<TextField
									margin='normal'
									label='Email Address'
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
									label='Password'
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
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<Button
								dataTestid={SIGN_UP_FORM_SETTINGS.TEST_IDS.SUBMIT_BTN}
								view='primary'
								disabled={isSubmitted && (!isValid || isSubmitting)}
								label='Войти'
								type='submit'
							/>
							<Button
								view='outlined'
								label='Регистрация'
								onClick={() => navigate('/signUp')}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
