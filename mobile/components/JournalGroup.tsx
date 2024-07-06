import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import React from 'react';
import { router } from 'expo-router';

import { IJournalEntry } from '@/types/IJournalEntry';
import JournalEntryCard from './JournalEntryCard';
import { ThemedText } from './ThemedText';
import Spacer from './Spacer';
import dayJsUTC from '@/utils/dayjs';
import { PAGE_PADDING } from '@/constants/Dimensions';

type Props = {
	sectionDate: string; // month format = YYYY-MM
	data: IJournalEntry[];
	showSectionHeader?: boolean;
};

const JournalGroup = ({
	data,
	sectionDate,
	showSectionHeader = true,
}: Props) => {
	return (
		<View style={styles.container}>
			{showSectionHeader && (
				<ThemedText style={styles.sectionDate}>
					{dayJsUTC(sectionDate, 'YYYY-MM').format('MMMM YYYY')}
				</ThemedText>
			)}
			<FlatList
				data={data}
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
						<View style={styles.padded}>
							<JournalEntryCard journalEntry={item} />
						</View>
					</TouchableWithoutFeedback>
				)}
				keyExtractor={(item) => item.entry_id.toString()}
				ItemSeparatorComponent={() => <Spacer h={20} />}
			/>
		</View>
	);
};

export default JournalGroup;

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	padded: {
		paddingLeft: PAGE_PADDING,
		paddingRight: PAGE_PADDING / 2,
	},
	sectionDate: {
		fontWeight: 600,
		fontSize: 20,
		paddingHorizontal: 10,
	},
});
