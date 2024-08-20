import React from 'react';
import './cardListStyled.scss';

import { Card } from '../card';
import { withQuery } from '../../HOCs/withQuery';

interface ICardListProps {
	products: IProduct[];
}

export const CardList = withQuery(({ products }: ICardListProps) => {
	return (
		<div className='card-list-wrapper'>
			<div className='card-list-wrapper_cards'>
				{products.map((item, index) => (
					<Card
						product={item}
						key={`${index}-card`}
						widthCard={236}
						variant='fullInfo'
						showTags
					/>
				))}
			</div>
		</div>
	);
});
