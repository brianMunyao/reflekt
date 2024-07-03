import {
	CATEGORIES_TABLE,
	JOURNAL_ENTRIES_TABLE,
} from '../configs/constants.config';
import { IJournalEntry } from '../types/IJournalEntry';

/**
 * Use this to generate a basic query to get journal entries.
 * Added to reduce code repetition in the journalEntries service
 *
 */
const constructJournalEntryQuery = (userId: number, entryId?: number) => {
	let query = `
        SELECT je.*, 
               c.category_id as category_id, 
               c.name as category_name, 
               c.icon as category_icon, 
               c.user_id as category_user_id, 
               c.created_at as category_created_at, 
               c.updated_at as category_updated_at
        FROM ${JOURNAL_ENTRIES_TABLE} je
        LEFT JOIN ${CATEGORIES_TABLE} c ON je.category_id = c.category_id
        WHERE je.user_id = $1
    `;
	const values: (number | string)[] = [userId];

	if (entryId) {
		query += ` AND je.entry_id = $2`;
		values.push(entryId);
	}

	return { query, values };
};

/**
 *
 * Use this to generate an object for one journal entry after querying the DB.
 * Added to reduce code repetition in the journalEntries service
 *
 */

const mapJournalEntryRow = (row: any): IJournalEntry => {
	return {
		entry_id: row.entry_id,
		user_id: row.user_id,
		title: row.title,
		content: row.content,
		category_id: row.category_id,
		created_at: row.created_at,
		updated_at: row.updated_at,
		category: row.category_id
			? {
					category_id: row.category_id,
					name: row.category_name,
					icon: row.category_icon,
					created_at: row.category_created_at,
					updated_at: row.category_updated_at,
					user_id: row.category_user_id,
			  }
			: undefined,
	};
};

export { constructJournalEntryQuery, mapJournalEntryRow };
