import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Spacer from './Spacer';
import { ThemedButton } from './ThemedButton';
import { IBtnVariant } from '@/types/IBtnVariant';
import TimeIntervalIcon from './TimeIntervalIcon';
import { IFilterMode } from '@/types/IFilterMode';
import DatePickerModal from './DatePickerModal';
import dayjs from 'dayjs';

type Props = {
	filterMode: IFilterMode;
	isVisible: boolean;
	onClose: () => void;
	onSelect: (params: {
		mode: IFilterMode;
		startDate?: string;
		endDate?: string;
	}) => void;
};

const SelectTimeIntervalModal = ({
	filterMode,
	isVisible,
	onClose,
	onSelect,
}: Props) => {
	const insets = useSafeAreaInsets();
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

	const [rangeValues, setRangeValues] = useState<any>({});

	const handleIntervalSelection = (mode: IFilterMode) => {
		onSelect({ mode });
	};

	const openDatePickerModal = () => {
		setIsDatePickerOpen(true);
	};
	const handleDateChange = (value: any) => {
		onSelect({
			mode: 'daily',
			startDate: dayjs(value.date).toISOString(),
			endDate: dayjs(value.date).toISOString(),
		});
		setIsDatePickerOpen(false);
	};
	const closeDatePickerModal = () => {
		setIsDatePickerOpen(false);
	};

	const openDateRangePickerModal = () => {
		setIsDateRangePickerOpen(true);
	};
	const handleDateRangeChange = (value: any) => {
		setRangeValues(value);
		if (value?.startDate && value?.endDate) {
			onSelect({
				mode: 'custom',
				startDate: dayjs(rangeValues.startDate).toISOString(),
				endDate: dayjs(rangeValues.endDate).toISOString(),
			});
			setIsDateRangePickerOpen(false);
		}
	};
	const closeDateRangePickerModal = () => {
		setIsDateRangePickerOpen(false);
	};

	return (
		<>
			<Modal
				deviceHeight={Dimensions.get('screen').height}
				isVisible={isVisible}
				statusBarTranslucent
				useNativeDriver
				useNativeDriverForBackdrop
				onBackButtonPress={onClose}
				onBackdropPress={onClose}
				style={styles.modal}
			>
				<View style={[styles.container, { paddingTop: insets.top }]}>
					<ThemedView style={styles.innerContainer}>
						<ThemedText style={styles.title}>
							Select Time Interval
						</ThemedText>

						<Spacer h={10} />

						<View style={styles.intervalIconContainer}>
							<TimeIntervalIcon
								filterMode="all"
								onPress={handleIntervalSelection}
								isSelected={filterMode === 'all'}
							/>
							<TimeIntervalIcon
								isSelected={filterMode === 'daily'}
								filterMode="daily"
								onPress={handleIntervalSelection}
							/>
						</View>
						<View style={styles.intervalIconContainer}>
							<TimeIntervalIcon
								isSelected={filterMode === 'weekly'}
								filterMode="weekly"
								onPress={handleIntervalSelection}
							/>
							<TimeIntervalIcon
								isSelected={filterMode === 'monthly'}
								filterMode="monthly"
								onPress={handleIntervalSelection}
							/>
						</View>
						<View style={styles.intervalIconContainer}>
							<TimeIntervalIcon
								filterMode="daily"
								overrideLabel="Select a Date"
								onPress={openDatePickerModal}
							/>
							<TimeIntervalIcon
								filterMode="custom"
								isSelected={filterMode === 'custom'}
								overrideLabel="Select a Range"
								onPress={openDateRangePickerModal}
							/>
						</View>
					</ThemedView>
				</View>
			</Modal>

			<DatePickerModal
				isVisible={isDatePickerOpen}
				onClose={closeDatePickerModal}
				onSelect={handleDateChange}
			/>

			<DatePickerModal
				mode="range"
				isVisible={isDateRangePickerOpen}
				startDate={rangeValues?.startDate}
				endDate={rangeValues?.endDate}
				onClose={closeDateRangePickerModal}
				onSelect={handleDateRangeChange}
			/>
		</>
	);
};

export default SelectTimeIntervalModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		minWidth: 300,
		padding: 25,
		borderRadius: 12,
		gap: 10,
	},
	title: {
		textAlign: 'center',
		fontWeight: 600,
		fontSize: 23,
	},
	intervalIconContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		gap: 10,
	},
});
