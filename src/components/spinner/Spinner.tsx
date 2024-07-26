import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alightItems: 'center',
			}}>
			<CircularProgress color='inherit' />;
		</Box>
	);
};
