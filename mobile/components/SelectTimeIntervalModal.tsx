import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Spacer from './Spacer';
import TimeIntervalIcon from './TimeIntervalIcon';
import { IFilterMode } from '@/types/IFilterMode';
import DatePickerModal from './DatePickerModal';
import dayJsUTC from '@/utils/dayjs';
import DateRangePickerModal from './DateRangePickerModal';
import { getDateISOStrUtil } from '@/utils/getDateISOStrUtil';

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

	const getDatesForInterval = (mode: IFilterMode) => {
		const dayJsDate = dayJsUTC();

		switch (mode) {
			case 'all':
				return {
					startDate: undefined,
					endDate: undefined,
				};

			case 'weekly':
				return {
					startDate: getDateISOStrUtil(dayJsDate.startOf('week')),
					endDate: getDateISOStrUtil(
						dayJsDate.endOf('week').add(1, 'day')
					),
				};

			case 'monthly':
				return {
					startDate: getDateISOStrUtil(dayJsDate.startOf('month')),
					endDate: getDateISOStrUtil(
						dayJsDate.endOf('month').add(1, 'day')
					),
				};

			case 'daily':
			default:
				return {
					startDate: getDateISOStrUtil(dayJsDate),
					endDate: getDateISOStrUtil(dayJsDate.add(1, 'day')),
				};

			/**
			 *
			 * We add 1 day to avoid a SQL query error that chops the last day off when
			 * fetching data btwn two dates
			 */
		}
	};

	const handleIntervalSelection = (mode: IFilterMode) => {
		onSelect({ mode, ...getDatesForInterval(mode) });
	};

	const openDatePickerModal = () => {
		setIsDatePickerOpen(true);
	};
	const handleDateChange = (value: any) => {
		onSelect({
			mode: 'daily',
			startDate: getDateISOStrUtil(dayJsUTC(value.date)),
			endDate: getDateISOStrUtil(dayJsUTC(value.date).add(1, 'day')),
		});
		setIsDatePickerOpen(false);
	};
	const closeDatePickerModal = () => {
		setIsDatePickerOpen(false);
	};

	const openDateRangePickerModal = () => {
		setIsDateRangePickerOpen(true);
	};
	const handleDateRangeChange = (values: {
		startDate: string;
		endDate: string;
	}) => {
		onSelect({
			mode: 'custom',
			startDate: getDateISOStrUtil(dayJsUTC(values.startDate)),
			endDate: getDateISOStrUtil(dayJsUTC(values.endDate)),
		});
		setIsDateRangePickerOpen(false);
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

			<DateRangePickerModal
				isVisible={isDateRangePickerOpen}
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
