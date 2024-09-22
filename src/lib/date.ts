export const formatDate = (date: Date) => {
	const dateStr1 = date.toISOString().split('T')[0]
	const dateStr2 = date.toISOString().split('T')[1].split('.')[0]

	return `${dateStr1} ${dateStr2}`
}
