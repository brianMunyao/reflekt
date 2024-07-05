import { useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedPage } from '@/components/ThemedPage';
import { PAGE_GAP, PAGE_PADDING } from '@/constants/Dimensions';
import { IJournalEntry } from '@/types/IJournalEntry';
import journalEntriesService from '@/api/services/journalEntriesService';
import PromptCard from '@/components/PromptCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadJournalEntries } from '@/store/slices/journalEntriesSlice';
import showToastsUtil from '@/utils/showToastsUtil';
import { router } from 'expo-router';

export default function HomeScreen() {
	const { user, logout } = useAuth();

	const dispatch = useAppDispatch();
	const { journalEntries } = useAppSelector((state) => state.journalEntry);

	useEffect(() => {
		journalEntriesService
			.getAllJournalEntries()
			.then((response) => {
				if (response?.success && response.data) {
					dispatch(loadJournalEntries(response.data.journalEntries));
				}
			})
			.catch((error) => {
				showToastsUtil.error(
					error?.message || 'Error fetching journal entries'
				);
			});
	}, []);

	return (
		<ThemedPage style={styles.pageContainer}>
			<View style={styles.appBar}>
				<ThemedText type="title">Hello, {user?.username}</ThemedText>
			</View>

			<PromptCard />

			<FlatList
				data={journalEntries}
				renderItem={({ item }) => (
					<TouchableWithoutFeedback
						onPress={() =>
							router.push({
								pathname: 'journal-entries/edit',
								params: {
									entryId: item.entry_id,
								},
							})
						}
					>
						<View>
							<ThemedText>{item.title}</ThemedText>
						</View>
					</TouchableWithoutFeedback>
				)}
				keyExtractor={(item) => item.entry_id.toString()}
				ListEmptyComponent={() => (
					<ThemedText style={{ fontStyle: 'italic' }}>
						No journal entries added
					</ThemedText>
				)}
			/>
		</ThemedPage>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		padding: PAGE_PADDING,
		gap: PAGE_GAP,
	},
	appBar: {
		marginTop: PAGE_PADDING,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
