import { BodyText } from '../../ui';
import { TItemLink } from '../constData';
import { Link, useLocation } from 'react-router-dom';

type TFooterMenuProps = {
	itemsMenu: TItemLink[];
};
export const FooterMenu = ({ itemsMenu }: TFooterMenuProps) => {
	const location = useLocation();
	return (
		<>
			{itemsMenu.map((item) => (
				<Link
					state={{ from: location }}
					key={`${item.id}`}
					to={item.link}
					style={{
						textDecoration: 'none',
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						alignItems: 'center',
					}}>
					{item.icon}
					<BodyText text={item.title} size='s2' fontWeight='600' />
				</Link>
			))}
		</>
	);
};
