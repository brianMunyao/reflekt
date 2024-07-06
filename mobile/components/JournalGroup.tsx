import {
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import React from 'react';

import { IJournalEntry } from '@/types/IJournalEntry';
import { router } from 'expo-router';
import JournalEntryCard from './JournalEntryCard';
import { ThemedText } from './ThemedText';
import Spacer from './Spacer';

type Props = {
	sectionDate: string;
	data: IJournalEntry[];
};

const JournalGroup = ({ data, sectionDate }: Props) => {
	return (
		<View>
			<Text>{sectionDate}</Text>
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
						<JournalEntryCard journalEntry={item} />
					</TouchableWithoutFeedback>
				)}
				keyExtractor={(item) => item.entry_id.toString()}
				ItemSeparatorComponent={() => <Spacer h={10} />}
			/>
		</View>
	);
};

export default JournalGroup;

const styles = StyleSheet.create({});
