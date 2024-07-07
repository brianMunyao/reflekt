import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedPage } from '@/components/ThemedPage';
import { PAGE_PADDING } from '@/constants/Dimensions';
import journalEntriesService from '@/api/services/journalEntriesService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadJournalEntries } from '@/store/slices/journalEntriesSlice';
import showToastsUtil from '@/utils/showToastsUtil';
import { IFilterMode } from '@/types/IFilterMode';
import Spacer from '@/components/Spacer';
import JournalGroup from '@/components/JournalGroup';
import DateNavigator from '@/components/DateNavigator';
import { groupDataByMonth } from '@/utils/groupDataByFilterMode';
import Divider from '@/components/Divider';
import GreetingCard from '@/components/GreetingCard';
import { ThemedButton } from '@/components/ThemedButton';

export default function HomeScreen() {
	const dispatch = useAppDispatch();

	const { journalEntries } = useAppSelector((state) => state.journalEntry);

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

	const goToAddNewJournalEntry = () => {
		router.push('/journal-entries/new');
	};

	useEffect(() => {
		journalEntriesService
			.getAllJournalEntries({ start_date: startDate, end_date: endDate })
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
	}, [startDate, endDate]);

	return (
		<ThemedPage style={styles.pageContainer}>
			<View style={[styles.topSection, styles.padded]}>
				<GreetingCard textAlign="center" />

				<ThemedButton
					size="small"
					variant="primary2"
					label="What's on your mind?"
					onPress={goToAddNewJournalEntry}
				/>
			</View>

			<View style={[styles.padded]}>
				<DateNavigator
					filterMode={filterMode}
					selectedDates={{ startDate, endDate }}
					onFilterModeChange={setFilterMode}
					onDateChange={handleDateChange}
				/>
			</View>
			<Divider spacing={0} />

			<FlatList
				ListHeaderComponent={() => <Spacer h={20} />}
				data={groupDataByMonth(journalEntries)}
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
							No journal entries found
						</ThemedText>
					</View>
				)}
				ItemSeparatorComponent={() => (
					<Divider
						spacing={20}
						style={{
							backgroundColor: 'rgba(211, 211, 211, 0.404)',
						}}
					/>
				)}
				ListFooterComponent={() => <Spacer h={50} />}
			/>
		</ThemedPage>
	);
}

const styles = StyleSheet.create({
	pageContainer: {},
	padded: {
		paddingHorizontal: PAGE_PADDING,
	},
	topSection: {
		gap: 20,
		paddingTop: 30,
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
