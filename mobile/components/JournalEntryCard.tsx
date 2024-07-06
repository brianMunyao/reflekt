import { StyleSheet, View } from 'react-native';
import React from 'react';

import { IGroupedJournalEntry } from '@/types/IJournalEntry';
import { ThemedText } from './ThemedText';
import { getBriefContentUtil } from '@/utils/getBriefContentUtil';
import dayJsUTC from '@/utils/dayjs';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
	journalEntry: IGroupedJournalEntry;
};

const JournalEntryCard = ({ journalEntry }: Props) => {
	const isCurrentDate = () => {
		return dayJsUTC().isSame(dayJsUTC(journalEntry.entry_date), 'date');
	};

	const bgColor = useThemeColor(
		{},
		isCurrentDate() ? 'primary' : 'secondaryButtonBackground'
	);
	const color = useThemeColor(
		{},
		isCurrentDate() ? 'white' : 'secondaryButtonText'
	);

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.dateContainer,
					{
						backgroundColor: isCurrentDate()
							? bgColor
							: 'rgba(200,200,200,0.3)',
						width: journalEntry?.labeled ? 2 : 52,
						marginHorizontal: journalEntry?.labeled ? 27 : 2,
					},
				]}
			>
				{!journalEntry?.labeled && (
					<>
						<ThemedText style={[styles.dateTop, { color: color }]}>
							{dayJsUTC(journalEntry.entry_date).format('ddd')}
						</ThemedText>
						<ThemedText
							style={[styles.dateBottom, { color: color }]}
						>
							{dayJsUTC(journalEntry.entry_date).format('D')}
						</ThemedText>
					</>
				)}
			</View>

			<View style={styles.mainContainer}>
				<ThemedText style={styles.journalTitle}>
					{journalEntry.title}
				</ThemedText>

				<ThemedText>
					{getBriefContentUtil(journalEntry.content, 150)}
				</ThemedText>
			</View>
		</View>
	);
};

export default JournalEntryCard;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
	dateContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 52,
		borderRadius: 10,
	},
	dateTop: {
		textTransform: 'uppercase',
		fontSize: 12,
	},
	dateBottom: {
		fontSize: 20,
		fontWeight: 500,
	},
	mainContainer: {
		flex: 1,
	},
	journalTitle: {
		fontWeight: 700,
		fontSize: 15,
		textTransform: 'uppercase',
	},
});
