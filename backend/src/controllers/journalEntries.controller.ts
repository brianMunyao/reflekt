import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest';
import { HttpError, handleHttpError } from '../utils/errors.util';
import journalEntriesService from '../services/journalEntries.service';

const getAllJournalEntries = async (
	req: IGetUserAuthInfoRequest,
	res: Response
) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const journalEntries = await journalEntriesService.getAllJournalEntries(
			req.user.user_id,
			req.query
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { journalEntries },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const getSingleJournalEntry = async (
	req: IGetUserAuthInfoRequest,
	res: Response
) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const journalEntry = await journalEntriesService.getSingleJournalEntry(
			req.user.user_id,
			Number(req.params.id)
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { journalEntry },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const createJournalEntry = async (
	req: IGetUserAuthInfoRequest,
	res: Response
) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const createdJournalEntry =
			await journalEntriesService.createJournalEntry(
				req.user.user_id,
				req.body
			);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			data: { journalEntry: createdJournalEntry },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const updateJournalEntry = async (
	req: IGetUserAuthInfoRequest,
	res: Response
) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const updatedJournalEntry =
			await journalEntriesService.updateJournalEntry(
				req.user.user_id,
				Number(req.params.id),
				req.body
			);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { journalEntry: updatedJournalEntry },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const deleteJournalEntry = async (
	req: IGetUserAuthInfoRequest,
	res: Response
) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const deletedJournalEntryId =
			await journalEntriesService.deleteJournalEntry(
				req.user.user_id,
				Number(req.params.id)
			);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Journal Entry deleted successfully',
			data: {
				id: deletedJournalEntryId,
			},
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const journalEntriesController = {
	getAllJournalEntries,
	getSingleJournalEntry,
	createJournalEntry,
	updateJournalEntry,
	deleteJournalEntry,
};

export default journalEntriesController;
