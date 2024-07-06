import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const dayJsUTC = dayjs.utc;

export default dayJsUTC;
