import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedPage } from '@/components/ThemedPage';
import { PAGE_GAP, PAGE_PADDING } from '@/constants/Dimensions';
import journalEntriesService from '@/api/services/journalEntriesService';
import PromptCard from '@/components/PromptCard';
import { useAppDispatch } from '@/store/hooks';
import { loadJournalEntries } from '@/store/slices/journalEntriesSlice';
import showToastsUtil from '@/utils/showToastsUtil';

export default function HomeScreen() {
	const { user, logout } = useAuth();

	const dispatch = useAppDispatch();

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
