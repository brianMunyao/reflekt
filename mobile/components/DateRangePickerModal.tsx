import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dayjs } from 'dayjs';

import { ThemedView } from './ThemedView';
import { PAGE_PADDING } from '@/constants/Dimensions';
import dayJsUTC from '@/utils/dayjs';
import TimeIntervalIcon from './TimeIntervalIcon';
import DatePickerModal from './DatePickerModal';
import { ThemedText } from './ThemedText';
import { ThemedButton } from './ThemedButton';

type Props = {
	isVisible: boolean;
	onClose: () => void;
	onSelect: (values: { startDate: string; endDate: string }) => void;
	selectedDate?: Dayjs;
	startDate?: Dayjs;
	endDate?: Dayjs;
};

const DateRangePickerModal = ({ isVisible, onClose, onSelect }: Props) => {
	const insets = useSafeAreaInsets();

	const [fromDate, setFromDate] = useState<string | undefined>(undefined);
	const [toDate, setToDate] = useState<string | undefined>(undefined);

	const [isFromModalOpen, setIsFromModalOpen] = useState(false);
	const [isToModalOpen, setIsToModalOpen] = useState(false);

	// Handles the 'from' date picker

	const openFromModal = () => {
		setIsFromModalOpen(true);
	};
	const handleFromDateChange = (value: any) => {
		setFromDate(value.date);
		setIsFromModalOpen(false);
	};
	const closeFromModal = () => {
		setIsFromModalOpen(false);
	};

	// Handles the 'to' date picker

	const openToModal = () => {
		setIsToModalOpen(true);
	};
	const handleToDateChange = (value: any) => {
		setToDate(value.date);
		setIsToModalOpen(false);
	};
	const closeToModal = () => {
		setIsToModalOpen(false);
	};

	// Saves and closes the modal
	const handleSave = () => {
		if (fromDate && toDate) {
			onSelect({ startDate: fromDate, endDate: toDate });
		}
	};

	const handleClear = (value: any) => {
		setFromDate(undefined);
		setToDate(undefined);
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
							Select A Range
						</ThemedText>

						<View style={styles.pickers}>
							<TimeIntervalIcon
								filterMode="daily"
								onPress={openFromModal}
								overrideLabel="From"
								overrideIcon=""
								extraLabel={dayJsUTC(fromDate).format(
									'DD MMM YYYY'
								)}
							/>
							<TimeIntervalIcon
								filterMode="daily"
								onPress={openToModal}
								overrideLabel="To"
								overrideIcon=""
								extraLabel={dayJsUTC(toDate).format(
									'DD MMM YYYY'
								)}
							/>
						</View>

						<View style={styles.btns}>
							<ThemedButton
								label="Clear"
								onPress={handleClear}
								variant="secondary"
							/>
							<View style={{ flex: 1 }}>
								<ThemedButton
									label="Set"
									onPress={handleSave}
								/>
							</View>
						</View>
					</ThemedView>
				</View>
			</Modal>

			<DatePickerModal
				maxDate={toDate ? dayJsUTC(toDate) : undefined}
				isVisible={isFromModalOpen}
				onClose={closeFromModal}
				onSelect={handleFromDateChange}
			/>

			<DatePickerModal
				minDate={fromDate ? dayJsUTC(fromDate) : undefined}
				isVisible={isToModalOpen}
				onClose={closeToModal}
				onSelect={handleToDateChange}
			/>
		</>
	);
};

export default DateRangePickerModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},

	container: {
		flex: 1,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		margin: PAGE_PADDING,
		padding: 15,
		paddingVertical: 20,
		borderRadius: 12,
		width: 250,
		gap: 20,
	},
	pickers: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
	},
	title: {
		textAlign: 'center',
		fontWeight: 600,
		fontSize: 22,
	},
	btns: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
});
