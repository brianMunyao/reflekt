import { QueryResult } from 'pg';

import { ICategory, ICategoryNew, ICategoryUpdate } from '../types/ICategory';
import pool from '../configs/db.config';
import {
	CATEGORIES_TABLE,
	JOURNAL_ENTRIES_TABLE,
} from '../configs/constants.config';
import { HttpError } from '../utils/errors.util';
import { StatusCodes } from 'http-status-codes';

const getAllCategories = async (userId: number) => {
	const categories: QueryResult<ICategory> = await pool.query(
		`
		SELECT * FROM ${CATEGORIES_TABLE}
			WHERE user_id = $1
        `,
		[userId]
	);

	return categories.rows;
};

const getSingleCategory = async (userId: number, categoryId: number) => {
	const category: QueryResult<ICategory> = await pool.query(
		`
		SELECT * FROM ${CATEGORIES_TABLE}
			WHERE user_id = $1 AND category_id = $2
        `,
		[userId, categoryId]
	);

	if (category.rows.length === 0) {
		// category not found
		throw new HttpError('Category not found.', StatusCodes.NOT_FOUND);
	}

	return category.rows[0];
};

const createCategory = async (userId: number, categoryNew: ICategoryNew) => {
	const newCategory: QueryResult<ICategory> = await pool.query(
		`
        INSERT INTO ${CATEGORIES_TABLE} (name, icon, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
		[categoryNew.name, categoryNew.icon, userId]
	);

	if (newCategory.rows.length === 0) {
		// category not created
		throw new HttpError('Error creating category. Try Again.');
	}

	return newCategory.rows[0];
};

const updateCategory = async (
	userId: number,
	categoryId: number,
	categoryUpdate: ICategoryUpdate
) => {
	// getSingleCategory handles getting the category that the user has permission to get
	await getSingleCategory(userId, categoryId);

	const updatedCategory: QueryResult<ICategory> = await pool.query(
		`
        UPDATE ${CATEGORIES_TABLE}
			SET 
				name = $1,
				icon = $2,
				updated_at = $3
			WHERE category_id = $4
            RETURNING *
        `,
		[
			categoryUpdate.name,
			categoryUpdate.icon,
			new Date().toISOString(),
			categoryId,
		]
	);

	if (updatedCategory.rows.length === 0) {
		// category not updated
		throw new HttpError('Error creating category. Try Again.');
	}

	return updatedCategory.rows[0];
};

const deleteCategory = async (userId: number, categoryId: number) => {
	// getSingleCategory handles getting the category that the user has permission to get
	await getSingleCategory(userId, categoryId);

	// check if a journal is linked to a category then remove the link
	const journalsLinked = await pool.query(
		`SELECT entry_id FROM ${JOURNAL_ENTRIES_TABLE} WHERE category_id=$1`,
		[categoryId]
	);

	if (journalsLinked.rows.length > 0) {
		await pool.query(
			`UPDATE ${JOURNAL_ENTRIES_TABLE} SET category_id=null WHERE category_id=$1`,
			[categoryId]
		);
	}

	const deletedCategory: QueryResult<ICategory> = await pool.query(
		`
        DELETE FROM ${CATEGORIES_TABLE}
        WHERE category_id = $1 AND user_id = $2
        RETURNING category_id;
    	`,
		[categoryId, userId]
	);

	if (deletedCategory.rows.length === 0) {
		// category not deleted
		throw new HttpError('Error deleting category. Try Again.');
	}

	return deletedCategory.rows[0].category_id;
};

const categoriesService = {
	getAllCategories,
	getSingleCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default categoriesService;
