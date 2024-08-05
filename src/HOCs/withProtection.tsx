import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../storage/hooks/useAppSelector';
import { userSelectors } from '../storage/slices/user';
import { ComponentType, FC } from 'react';

export const withProtection = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P> = (props) => {
		const accessToken = useAppSelector(userSelectors.accessTokenSelector);
		const location = useLocation();

		// Если токен пустой, то нужно отправить пользователя на странице входа в систему
		if (!accessToken) {
			return (
				<Navigate
					to='/signIn'
					// при этом мы передаем состояние, в котором указываем, какую
					// страницу хотел посетить пользователь. И если он в дальнейшем
					// войдет в систему, то мы его автоматически перебросим на желаемую страницу
					state={{
						from: location.pathname,
					}}
				/>
			);
		}

		return <WrappedComponent {...props} />;
	};

	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
