import { useEffect, useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import JournalEntryForm from '@/components/JournalEntryForm';
import { IJournalEntry, IJournalEntryUpdate } from '@/types/IJournalEntry';
import journalEntriesService from '@/api/services/journalEntriesService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateJournalEntry } from '@/store/slices/journalEntriesSlice';
import showToastsUtil from '@/utils/showToastsUtil';

export default function UpdateJournalEntryPage() {
	const [formError, setFormError] = useState('');
	const [openedJournalEntry, setOpenedJournalEntry] = useState<
		IJournalEntry | undefined
	>(undefined);

	const params = useLocalSearchParams<any>();
	const memoizedParams = useMemo(() => params, [params]);

	const { journalEntries } = useAppSelector((state) => state.journalEntry);

	const dispatch = useAppDispatch();

	const handleSubmit = async (values: IJournalEntryUpdate) => {
		if (openedJournalEntry) {
			const entryId = openedJournalEntry.entry_id;

			const response = await journalEntriesService.updateJournalEntry(
				entryId,
				values
			);

			if (response.success && response?.data) {
				dispatch(
					updateJournalEntry({
						entryId,
						journalEntry: response.data?.journalEntry,
					})
				);
				router.replace('/');
			} else {
				setFormError(response?.message || 'Error occured. Try Again.');
			}
		}
	};

	useEffect(() => {
		const entryId = memoizedParams?.entryId;
		if (entryId) {
			const journalEntry = journalEntries.find(
				(entry) => entry.entry_id === Number(entryId)
			);
			if (journalEntry) {
				setOpenedJournalEntry(journalEntry);
			} else {
				showToastsUtil.error('Could not find entry');
				router.back();
			}
		} else {
			showToastsUtil.error('Could not find entry');
			router.back();
		}
	}, []);

	return (
		<JournalEntryForm
			mode="edit"
			formError={formError}
			handleSubmit={handleSubmit}
			formValues={openedJournalEntry}
		/>
	);
}
