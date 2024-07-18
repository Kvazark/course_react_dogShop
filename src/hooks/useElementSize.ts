import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ISize {
	width?: number;
	height?: number;
}

export function useElementSize<T extends HTMLElement>(): [
	React.RefObject<T>,
	ISize
] {
	const ref = useRef<T>(null);
	const [size, setSize] = useState<ISize>({ width: 0, height: 0 });

	const updateSize = useCallback(() => {
		if (ref.current) {
			setSize({
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			});
		}
	}, []);

	useEffect(() => {
		const element = ref.current;
		if (element) {
			updateSize();
			window.addEventListener('resize', updateSize);
		}
		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, [updateSize]);

	return [ref, size];
}
