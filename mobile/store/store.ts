import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import categoriesReducer from '@/store/slices/categoriesSlice';
import journalEntriesReducer from '@/store/slices/journalEntriesSlice';

const rootReducer = combineReducers({
	category: categoriesReducer,
	journalEntry: journalEntriesReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
