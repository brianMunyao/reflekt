import { IJournalEntry } from '@/types/IJournalEntry';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
	journalEntries: IJournalEntry[];
}

const initialState: CategoriesState = {
	journalEntries: [],
};

const journalEntrySlice = createSlice({
	name: 'journalEntry',
	initialState,
	reducers: {
		loadJournalEntries: (state, action: PayloadAction<IJournalEntry[]>) => {
			state.journalEntries = action.payload;
		},
		createJournalEntry: (state, action: PayloadAction<IJournalEntry>) => {
			state.journalEntries = [...state.journalEntries, action.payload];
		},
		updateJournalEntry: (
			state,
			action: PayloadAction<{
				entryId: number;
				journalEntry: IJournalEntry;
			}>
		) => {
			state.journalEntries = state.journalEntries.map((journalEntry) =>
				journalEntry.entry_id === action.payload.entryId
					? action.payload.journalEntry
					: journalEntry
			);
		},
		deleteJournalEntry: (
			state,
			action: PayloadAction<{ entryId: number }>
		) => {
			state.journalEntries = state.journalEntries.filter(
				(journalEntry) =>
					journalEntry.entry_id !== action.payload.entryId
			);
		},
	},
});

export const {
	loadJournalEntries,
	createJournalEntry,
	updateJournalEntry,
	deleteJournalEntry,
} = journalEntrySlice.actions;
export default journalEntrySlice.reducer;
