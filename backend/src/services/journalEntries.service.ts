import { QueryResult } from 'pg';
import { StatusCodes } from 'http-status-codes';

import pool from '../configs/db.config';
import { JOURNAL_ENTRIES_TABLE } from '../configs/constants.config';
import { HttpError } from '../utils/errors.util';
import {
	IJournalEntry,
	IJournalEntryNew,
	IJournalEntryUpdate,
} from '../types/IJournalEntry';
import categoriesService from './categories.service';
import {
	constructJournalEntryQuery,
	mapJournalEntryRow,
} from '../utils/journalEntries.util';

const getAllJournalEntries = async (
	userId: number,
	params?: {
		category_id?: number;
		start_date?: string;
		end_date?: string;
	}
) => {
	const { query, values } = constructJournalEntryQuery(userId);

	let _query = query;
	const queryValues = [...values];

	if (params) {
		if (params?.category_id) {
			queryValues.push(Number(params.category_id));
			_query += ` AND je.category_id = $${queryValues.length}`;
		}
		if (params?.start_date) {
			queryValues.push(params.start_date);
			_query += ` AND je.entry_date >= $${queryValues.length}`;
		}
		if (params?.end_date) {
			queryValues.push(params.end_date);
			_query += ` AND je.entry_date <= $${queryValues.length}`;
		}
	}

	_query += ';';

	const result: QueryResult = await pool.query(_query, queryValues);

	const journalEntries: IJournalEntry[] = result.rows.map((row) =>
		mapJournalEntryRow(row)
	);

	return journalEntries;
};

const getSingleJournalEntry = async (userId: number, entryId: number) => {
	const { query, values } = constructJournalEntryQuery(userId, entryId);

	const journalEntry: QueryResult = await pool.query(query, values);

	if (journalEntry.rows.length === 0) {
		// journalEntry not found
		throw new HttpError('Journal Entry not found.', StatusCodes.NOT_FOUND);
	}

	const journalEntryRow = journalEntry.rows[0];

	return mapJournalEntryRow(journalEntryRow);
};

const createJournalEntry = async (
	userId: number,
	journalEntryNew: IJournalEntryNew
) => {
	if (journalEntryNew?.category_id) {
		// Check if the user has access to the category
		await categoriesService.getSingleCategory(
			userId,
			journalEntryNew.category_id
		);
	}

	const newJournalEntry: QueryResult<{ entry_id: number }> = await pool.query(
		`
        INSERT INTO ${JOURNAL_ENTRIES_TABLE} (title, content, category_id, user_id, entry_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING entry_id
        `,
		[
			journalEntryNew.title,
			journalEntryNew.content,
			journalEntryNew.category_id,
			userId,
			journalEntryNew.entry_date,
		]
	);

	if (newJournalEntry.rows.length === 0) {
		// journal entry not created
		throw new HttpError('Error creating journal entry. Try Again.');
	}

	const newEntryId = newJournalEntry.rows[0].entry_id;

	// Get the complete journal entry object with the category object added to it
	const journalEntry = await getSingleJournalEntry(userId, newEntryId);

	return journalEntry;
};

const updateJournalEntry = async (
	userId: number,
	journalEntryId: number,
	journalEntryUpdate: IJournalEntryUpdate
) => {
	if (journalEntryUpdate?.category_id) {
		// Check if the user has access to the category
		await categoriesService.getSingleCategory(
			userId,
			journalEntryUpdate.category_id
		);
	}

	// getSingleJournalEntry handles getting the journal that the user has permission to get
	await getSingleJournalEntry(userId, journalEntryId);

	const updatedJournalEntry: QueryResult<{ entry_id: number }> =
		await pool.query(
			`
        UPDATE ${JOURNAL_ENTRIES_TABLE}
			SET
				title = $1,
				content = $2,
				category_id = $3,
				entry_date = $4,
				updated_at = $5
			WHERE entry_id = $6
            RETURNING entry_id
        `,
			[
				journalEntryUpdate.title,
				journalEntryUpdate.content,
				journalEntryUpdate.category_id,
				journalEntryUpdate.entry_date,
				new Date().toISOString(),
				journalEntryId,
			]
		);

	if (updatedJournalEntry.rows.length === 0) {
		// journal entry not updated
		throw new HttpError('Error updating journal entry. Try Again.');
	}

	const newEntryId = updatedJournalEntry.rows[0].entry_id;

	// Get the complete journal entry object with the category object added to it
	const journalEntry = await getSingleJournalEntry(userId, newEntryId);

	return journalEntry;
};

const deleteJournalEntry = async (userId: number, journalEntryId: number) => {
	// getSingleJournalEntry handles getting the category that the user has permission to get
	await getSingleJournalEntry(userId, journalEntryId);

	const deletedJournalEntry: QueryResult<{ entry_id: number }> =
		await pool.query(
			`
			DELETE FROM ${JOURNAL_ENTRIES_TABLE}
			WHERE entry_id = $1 AND user_id = $2
			RETURNING entry_id;
    	`,
			[journalEntryId, userId]
		);

	if (deletedJournalEntry.rows.length === 0) {
		// journal entry not deleted
		throw new HttpError('Error deleting journal entry. Try Again.');
	}

	return deletedJournalEntry.rows[0].entry_id;
};

const journalEntriesService = {
	getAllJournalEntries,
	getSingleJournalEntry,
	createJournalEntry,
	updateJournalEntry,
	deleteJournalEntry,
};

export default journalEntriesService;
