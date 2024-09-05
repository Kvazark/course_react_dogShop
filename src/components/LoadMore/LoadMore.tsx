import { Alert, CircularProgress, Stack } from '@mui/material';
import { FC, useLayoutEffect, useRef } from 'react';

interface LoadMoreProps {
	action: () => void;
	isLoading?: boolean;
	isEndOfList?: boolean;
}

export const LoadMore: FC<LoadMoreProps> = ({
	action,
	isLoading,
	isEndOfList,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;
		if (!isEndOfList) {
			const options: IntersectionObserverInit = {
				threshold: 0.5,
			};
			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting) {
					action();
				}
			};

			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer?.disconnect();
		};
	}, [action, isEndOfList]);

	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isLoading && <CircularProgress />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
