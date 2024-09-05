import s from './placeholderCardStyled.module.scss';
import { SvgIcon } from '@mui/material';
import { QualityIcon, TruckIcon } from '../../../assets/images';
import { BodyText } from '../Texts';

type TPlaceholderCardProps = {
	view: 'delivery' | 'quality';
};

export const PlaceholderCard = ({ view }: TPlaceholderCardProps) => {
	if (view === 'delivery')
		return (
			<div className={s.placeholdersWrapper}>
				<div className={s.placeholdersWrapper_icons}>
					<SvgIcon component={TruckIcon} sx={{ width: '32px' }} />
				</div>
				<div className={s.placeholdersWrapper_description}>
					<BodyText text='Доставка по всему Миру!' size='p1' fontWeight='700' />
					<div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
						<BodyText text='Доставка курьером —' size='p2' />
						<BodyText text={'от 399 ₽'} size='p2' fontWeight='700' />
					</div>
					<div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
						<BodyText text='Доставка в пункт выдачи —' size='p2' />
						<BodyText text='от 199 ₽' size='p2' fontWeight='700' />
					</div>
				</div>
			</div>
		);
	else
		return (
			<div className={s.placeholdersWrapper}>
				<div className={s.placeholdersWrapper_icons}>
					<SvgIcon component={QualityIcon} sx={{ height: '40px' }} />
				</div>
				<div className={s.placeholdersWrapper_description}>
					<BodyText text='Гарантия качества' size='p1' fontWeight='700' />
					<BodyText
						text='Если Вам не понравилось качество нашей продукции,
							мы вернем деньги, либо сделаем все возможное,
							чтобы удовлетворить ваши нужды.'
						size='p2'
					/>
				</div>
			</div>
		);
};
