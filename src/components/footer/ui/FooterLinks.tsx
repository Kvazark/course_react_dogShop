import { TItemLink } from '../constData';
import { BodyText } from '../../ui';
import { Link } from 'react-router-dom';

type TFooterLinksProps = {
	links: TItemLink[];
};
export const FooterLinks = ({ links }: TFooterLinksProps) => {
	return (
		<>
			{links.map((item) => (
				<Link
					key={`${item.id}`}
					to={item.link}
					style={{ textDecoration: 'none' }}>
					<BodyText text={item.title} size='p1' fontWeight='700' />
				</Link>
			))}
		</>
	);
};
