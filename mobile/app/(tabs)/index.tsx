import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedPage } from '@/components/ThemedPage';
import { PAGE_GAP, PAGE_PADDING } from '@/constants/Dimensions';
import journalEntriesService from '@/api/services/journalEntriesService';
import PromptCard from '@/components/PromptCard';
import { useAppDispatch } from '@/store/hooks';
import { loadJournalEntries } from '@/store/slices/journalEntriesSlice';
import showToastsUtil from '@/utils/showToastsUtil';
import { IFilterMode } from '@/types/IFilterMode';
import Spacer from '@/components/Spacer';
import JournalGroup from '@/components/JournalGroup';
import DateNavigator from '@/components/DateNavigator';
import { IJournalEntry } from '@/types/IJournalEntry';
import { groupDataByMonth } from '@/utils/groupDataByFilterMode';
import Divider from '@/components/Divider';

export default function HomeScreen() {
	const { user } = useAuth();
	const dispatch = useAppDispatch();
	const [fetchedJournalEntries, setFetchedJournalEntries] = useState<
		IJournalEntry[]
	>([]);

	const [filterMode, setFilterMode] = useState<IFilterMode>('all');

	const [startDate, setStartDate] = useState<string | undefined>(undefined);
	const [endDate, setEndDate] = useState<string | undefined>(undefined);

	const handleDateChange = (params: {
		startDate?: string;
		endDate?: string;
	}) => {
		setStartDate(params.startDate);
		setEndDate(params.endDate);
	};

	useEffect(() => {
		journalEntriesService
			.getAllJournalEntries({ start_date: startDate, end_date: endDate })
			.then((response) => {
				if (response?.success && response.data) {
					dispatch(loadJournalEntries(response.data.journalEntries));
					setFetchedJournalEntries(response.data.journalEntries);
				}
			})
			.catch((error) => {
				showToastsUtil.error(
					error?.message || 'Error fetching journal entries'
				);
			});
	}, [startDate, endDate]);

	return (
		<ThemedPage style={styles.pageContainer}>
			<View style={[styles.appBar, styles.padded]}>
				<ThemedText type="title">Hello, {user?.username}</ThemedText>
			</View>
			<View style={styles.padded}>
				<PromptCard />
			</View>

			<View style={[styles.padded]}>
				<DateNavigator
					filterMode={filterMode}
					selectedDates={{ startDate, endDate }}
					onFilterModeChange={setFilterMode}
					onDateChange={handleDateChange}
				/>
			</View>

			<FlatList
				data={groupDataByMonth(fetchedJournalEntries)}
				renderItem={({ item }) => (
					<JournalGroup
						sectionDate={item.sectionDate}
						data={item.data}
					/>
				)}
				keyExtractor={(item) => item.sectionDate.toString()}
				ListEmptyComponent={() => (
					<View style={styles.noJournalsFound}>
						<ThemedText style={{ fontStyle: 'italic' }}>
							No journal found
						</ThemedText>
					</View>
				)}
				ItemSeparatorComponent={() => <Divider spacing={20} />}
				ListFooterComponent={() => <Spacer h={50} />}
			/>
		</ThemedPage>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		gap: PAGE_GAP,
	},
	padded: {
		paddingHorizontal: PAGE_PADDING,
	},
	dateNavigator: {
		marginBottom: 20,
	},
	appBar: {
		marginTop: PAGE_PADDING,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	filterOptionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 3,
	},
	noJournalsFound: {
		paddingVertical: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
