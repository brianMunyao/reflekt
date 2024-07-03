import { Router } from 'express';

import verifyAccessTokenMiddleware from '../middlewares/verifyAccessToken.middleware';
import validateRequiredParamsMiddleware from '../middlewares/validateRequiredParams.middleware';
import journalEntriesController from '../controllers/journalEntries.controller';

const router = Router();

router.get(
	'/',
	verifyAccessTokenMiddleware(),
	journalEntriesController.getAllJournalEntries
);

router.get(
	'/:id',
	verifyAccessTokenMiddleware(),
	journalEntriesController.getSingleJournalEntry
);

router.post(
	'/',
	verifyAccessTokenMiddleware(),
	validateRequiredParamsMiddleware(['title', 'content', 'category_id']),
	journalEntriesController.createJournalEntry
);

router.put(
	'/:id',
	verifyAccessTokenMiddleware(),
	validateRequiredParamsMiddleware(['title', 'content', 'category_id']),
	journalEntriesController.updateJournalEntry
);

router.delete(
	'/:id',
	verifyAccessTokenMiddleware(),
	journalEntriesController.deleteJournalEntry
);

export default router;
