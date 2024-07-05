import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

import { ThemedCard } from './ThemedCard';
import { ThemedText } from './ThemedText';

const PromptCard = () => {
	const goToAddNewJournalEntry = () => {
		router.push('/journal-entries/new');
	};

	return (
		<TouchableWithoutFeedback onPress={goToAddNewJournalEntry}>
			<ThemedCard style={styles.container}>
				<ThemedText style={styles.promptText}>
					What's on your mind today?
				</ThemedText>
			</ThemedCard>
		</TouchableWithoutFeedback>
	);
};

export default PromptCard;

const styles = StyleSheet.create({
	container: {
		padding: 15,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#eee',
		height: 100,
	},
	promptText: {
		fontStyle: 'italic',
	},
});
