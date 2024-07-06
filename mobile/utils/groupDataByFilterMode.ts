import dayjs from 'dayjs';

import { IFilterMode } from '@/types/IFilterMode';
import { IJournalEntry } from '@/types/IJournalEntry';

export const groupDataByMonth = (
	data: IJournalEntry[],
	filterMode: IFilterMode = 'monthly'
) => {
	const groupedData = data.reduce((acc, item) => {
		let sectionDate: string = dayjs().format('YYYY-MM-DD');

		// Find existing group or create a new one
		sectionDate = dayjs(item.entry_date).format('YYYY-MM');
		const existingGroup = acc.find(
			(group: any) => group.sectionDate === sectionDate
		);
		if (existingGroup) {
			existingGroup.data.push(item);
		} else {
			acc.push({ sectionDate, data: [item] });
		}

		return acc;
	}, [] as { sectionDate: string; data: any[] }[]);

	return groupedData;
};
