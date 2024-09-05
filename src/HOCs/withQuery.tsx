import { ComponentType, FC } from 'react';
import { Spinner } from '../components/spinner';
import { Alert, AlertTitle, Button, Container } from '@mui/material';

export interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	queryErrorMessage?: string;
}

export const withQuery = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<WithQueryProps & P> = (props) => {
		const {
			isError,
			isLoading,
			refetch,
			queryErrorMessage,
			...propsForWrappedComponent
		} = props;

		if (isError) {
			return (
				<Container maxWidth='sm'>
					<Alert
						action={
							// Эта кнопка нужна для повторного запроса
							<Button onClick={refetch} color='inherit' size='small'>
								Refetch
							</Button>
						}
						severity='error'>
						<AlertTitle>Error</AlertTitle>
						{queryErrorMessage ?? 'Unknown error. Please resend request'}
					</Alert>
				</Container>
			);
		}
		if (isLoading) {
			return <Spinner />;
		}

		return <WrappedComponent {...(propsForWrappedComponent as P)} />;
	};

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
