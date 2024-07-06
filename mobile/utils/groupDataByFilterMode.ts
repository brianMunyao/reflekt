import {
	IGroupedJournalEntry,
	IJournalEntry,
	IJournalGroup,
} from '@/types/IJournalEntry';
import dayJsUTC from './dayjs';

export const groupDataByMonth = (data: IJournalEntry[]): IJournalGroup[] => {
	const _data = [...data];

	const sortedData = _data.sort((a, b) =>
		dayJsUTC(b.entry_date).diff(dayJsUTC(a.entry_date))
	);

	const groupedData = sortedData.reduce((acc, item, index, arr) => {
		let labeledItem: IGroupedJournalEntry = { ...item, labeled: false };
		const sectionDate = dayJsUTC(labeledItem.entry_date).format('YYYY-MM');
		// Check if the previous item has the same date

		if (
			index > 0 &&
			dayJsUTC(arr[index - 1].entry_date).isSame(
				labeledItem.entry_date,
				'day'
			)
		) {
			labeledItem = { ...labeledItem, labeled: true }; // Add the labeled property
		}

		// Find existing group or create a new one
		const existingGroup = acc.find(
			(group) => group.sectionDate === sectionDate
		);
		if (existingGroup) {
			existingGroup.data.push(labeledItem);
		} else {
			// @ts-ignore
			acc.push({ sectionDate, data: [labeledItem] });
		}

		return acc;
	}, [] as IJournalGroup[]);

	return groupedData;
};
