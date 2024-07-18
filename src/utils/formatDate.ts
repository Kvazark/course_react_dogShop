export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const months = [
		'янв',
		'фев',
		'мар',
		'апр',
		'май',
		'июн',
		'июл',
		'авг',
		'сен',
		'окт',
		'ноя',
		'дек',
	];

	const day = date.getDate().toString().padStart(2, '0');
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}
