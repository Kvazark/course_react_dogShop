import { dataFAQ } from '../../utils/mocks/faqData';
import { Accordion, HeaderText } from '../../components/ui';
import { Box } from '@mui/material';

export const FaqPage = () => {
	return (
		<Box>
			<HeaderText text='Часто спрашивают' size='h1' />
			{dataFAQ.map((data, index) => (
				<Accordion key={index} title={data.title}>
					{data.content}
				</Accordion>
			))}
		</Box>
	);
};
