import dayjs from 'dayjs'
import { SERVER_DATE_FORMAT } from '../globalConsts/timeFormats'

export const getNextRetryTimeValue = value => {
	return value &&
		dayjs(value, SERVER_DATE_FORMAT).isValid() &&
		dayjs(value, SERVER_DATE_FORMAT).isAfter(dayjs())
		? value
		: undefined
}
