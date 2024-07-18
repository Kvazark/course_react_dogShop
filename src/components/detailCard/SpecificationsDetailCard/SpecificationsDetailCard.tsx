import s from './specificationsDetailCardStyled.module.scss';
import { BodyText, HeaderText } from '../../ui';

type TSpecificationsProps = {
	wight?: string;
	price?: number;
	description?: string;
};

export const SpecificationsDetailCard = ({
	wight,
	price,
	description,
}: TSpecificationsProps) => {
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_description}>
				<HeaderText text='Описание' size='h1' />
				<BodyText text={description} size='p1' />
			</div>
			<div className={s.wrapper_specificationWrapper}>
				<HeaderText text='Характеристики' size='h1' />
				<div className={s.wrapper_specificationWrapper_specifications}>
					<div className={s.specification}>
						<div className={s.specification_left}>
							<span>
								<BodyText text='Вес' size='p1' />
							</span>
						</div>
						<BodyText text={`1 шт ${wight}`} size='p2' />
					</div>
					{price && (
						<div className={s.specification}>
							<div className={s.specification_left}>
								<span>
									<BodyText text='Цена' size='p1' />
								</span>
							</div>
							<BodyText text={`${price} ₽`} size='p2' />
						</div>
					)}
					<div className={s.specification}>
						<div className={s.specification_left}>
							<span>
								<BodyText text='Польза' size='p1' />
							</span>
						</div>
						<BodyText text={description} size='p2' />
					</div>
				</div>
			</div>
		</div>
	);
};
