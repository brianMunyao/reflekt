import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { IJournalEntry } from '@/types/IJournalEntry';
import { ThemedCard } from './ThemedCard';
import { ThemedText } from './ThemedText';
import { getBriefContent } from '@/utils/getBriefContent';

type Props = {
	journalEntry: IJournalEntry;
};

const JournalEntryCard = ({ journalEntry }: Props) => {
	return (
		<ThemedCard>
			<ThemedText>{journalEntry.title}</ThemedText>

			<ThemedText>{getBriefContent(journalEntry.content)}</ThemedText>
		</ThemedCard>
	);
};

export default JournalEntryCard;

const styles = StyleSheet.create({});
