export const formatDate = (date: Date) => {
	return `${date.getFullYear()}年${
		date.getMonth() + 1
	}月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`
}
