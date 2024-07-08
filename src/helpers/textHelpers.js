import { isString } from 'lodash'

export const getNounFromNumber = (number, one, two, five) => {
	let n = Math.abs(number)
	n %= 100
	if (n >= 5 && n <= 20) {
		return five
	}
	n %= 10
	if (n === 1) {
		return one
	}
	if (n >= 2 && n <= 4) {
		return two
	}
	return five
}

export const addZeroBefore = text => {
	const val = isString(text) ? parseInt(text, 10) : text
	if (val > -10 && val < 10) {
		return val >= 0 ? `0${val}` : `-0${Math.abs(val)}`
	}
	return text
}
