export const formatDate = (date: Date) => {
	const dateStr1 = date.toISOString().split('T')[0]
	const dateStr2 = date.toISOString().split('T')[1].slice(0, 5)

	return `${dateStr1} ${dateStr2}`
}
