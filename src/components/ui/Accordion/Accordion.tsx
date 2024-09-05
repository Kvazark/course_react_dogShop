import { ReactNode, useState } from 'react';
import cn from 'classnames';
import s from './accordionStyled.module.scss';
import { useElementSize } from '../../../hooks';

interface IAccordionProps {
	title: string;
	children: ReactNode;
}

export function Accordion({ title, children }: IAccordionProps) {
	const [selected, setSelected] = useState(false);
	const [contentRef, { height }] = useElementSize<HTMLParagraphElement>();

	function toggleAccordionState() {
		setSelected(!selected);
	}

	return (
		<div className={cn(s.accordion, { [s.active]: selected })}>
			<button className={s.accordionButton} onClick={toggleAccordionState}>
				<p className={s.title}>{title}</p>
			</button>
			<div className={s.content} style={{ height: selected ? height : 0 }}>
				<p ref={contentRef} className={s.text}>
					{children}
				</p>
			</div>
		</div>
	);
}
