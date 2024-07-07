import { Dayjs } from 'dayjs';
import dayJsUTC from './dayjs';

/**
 *
 * Given a dayjs date it converts it to the format 'YYYY-MM-DD' then to ISOString
 */
export const getDateISOStrUtil = (dayjsDate: Dayjs) => {
	return dayJsUTC(dayjsDate.format('YYYY-MM-DD')).toISOString();
};
