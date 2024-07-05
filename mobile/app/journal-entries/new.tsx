import { useState } from 'react';
import { router } from 'expo-router';

import JournalEntryForm from '@/components/JournalEntryForm';
import { IJournalEntryNew } from '@/types/IJournalEntry';
import journalEntriesService from '@/api/services/journalEntriesService';
import { useAppDispatch } from '@/store/hooks';
import { createJournalEntry } from '@/store/slices/journalEntriesSlice';

export default function NewJournalEntryPage() {
	const [formError, setFormError] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = async (values: IJournalEntryNew) => {
		const response = await journalEntriesService.createJournalEntry(values);

		if (response.success && response?.data) {
			dispatch(createJournalEntry(response.data?.journalEntry));
			router.replace('/');
		} else {
			setFormError(response?.message || 'Error occured. Try Again.');
		}
	};

	return (
		<JournalEntryForm
			mode="new"
			formError={formError}
			handleSubmit={handleSubmit}
		/>
	);
}
