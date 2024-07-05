import {
	ICreateJournalEntryResponse,
	IDeleteJournalEntryResponse,
	IGetJournalEntriesResponse,
	IGetJournalEntryResponse,
	IJournalEntryNew,
	IJournalEntryUpdate,
	IUpdateJournalEntryResponse,
} from '@/types/IJournalEntry';
import axiosClient from '../configs/axiosConfig';

const getAllJournalEntries = async (params?: {
	category_id?: number;
	start_date?: string;
	end_date?: string;
}) => {
	try {
		const response = await axiosClient.get<IGetJournalEntriesResponse>(
			'/journal-entries/',
			{ params }
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const getSingleJournalEntry = async (entryId: number) => {
	try {
		const response = await axiosClient.get<IGetJournalEntryResponse>(
			`/journal-entries/${entryId}`
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const createJournalEntry = async (newJournalEntry: IJournalEntryNew) => {
	try {
		const response = await axiosClient.post<ICreateJournalEntryResponse>(
			`/journal-entries/`,
			newJournalEntry
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const updateJournalEntry = async (updatedJournalEntry: IJournalEntryUpdate) => {
	try {
		const response = await axiosClient.put<IUpdateJournalEntryResponse>(
			`/journal-entries/`,
			updatedJournalEntry
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const deleteJournalEntry = async (entryId: number) => {
	try {
		const response = await axiosClient.delete<IDeleteJournalEntryResponse>(
			`/journal-entries/${entryId}`
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const journalEntriesService = {
	getAllJournalEntries,
	getSingleJournalEntry,
	createJournalEntry,
	updateJournalEntry,
	deleteJournalEntry,
};

export default journalEntriesService;
