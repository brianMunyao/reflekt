import { ICategory } from './ICategory';
import { IResponse } from './IResponse';

export interface IJournalEntryNew {
	title: string;
	content: string;
	entry_date?: string;
	category_id?: number;
}

export type IJournalEntryUpdate = IJournalEntryNew;

export interface IJournalEntry extends IJournalEntryNew {
	entry_id: number;
	user_id: number;
	created_at: string;
	updated_at?: string;

	category?: ICategory;
}

// Types for the api responses

export type IGetJournalEntriesResponse = IResponse<{
	journalEntries: IJournalEntry[];
}>;
export type IGetJournalEntryResponse = IResponse<{
	journalEntry: IJournalEntry;
}>;
export type ICreateJournalEntryResponse = IResponse<{
	journalEntry: IJournalEntry;
}>;
export type IUpdateJournalEntryResponse = IResponse<{
	journalEntry: IJournalEntry;
}>;
export type IDeleteJournalEntryResponse = IResponse<{ id: number }>;
